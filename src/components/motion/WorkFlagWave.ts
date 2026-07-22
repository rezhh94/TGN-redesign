import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D imageMap;
  uniform float opacity;
  uniform float monochromeAmount;
  uniform vec2 planeSize;
  uniform float cornerRadius;
  varying vec2 vUv;

  void main() {
    vec2 point = (vUv - 0.5) * planeSize;
    vec2 roundedBox = abs(point) - planeSize * 0.5 + cornerRadius;
    float distanceToEdge = min(max(roundedBox.x, roundedBox.y), 0.0)
      + length(max(roundedBox, 0.0)) - cornerRadius;
    float edgeAlpha = 1.0 - smoothstep(-0.5, 0.5, distanceToEdge);

    if (edgeAlpha <= 0.0) discard;

    vec4 imageColor = texture2D(imageMap, vUv);
    float luminance = dot(imageColor.rgb, vec3(0.2126, 0.7152, 0.0722));
    vec3 displayColor = mix(imageColor.rgb, vec3(luminance), monochromeAmount);
    gl_FragColor = vec4(displayColor, imageColor.a * opacity * edgeAlpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const easeInOutCubic = (value: number) => value < 0.5
  ? 4 * value * value * value
  : 1 - Math.pow(-2 * value + 2, 3) / 2;

type WaveStage = {
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  width: number;
  height: number;
};

class WaveCard {
  readonly card: HTMLElement;
  readonly media: HTMLElement;
  readonly image: HTMLImageElement;

  private readonly stage: WaveStage;
  private readonly textureLoader: THREE.TextureLoader;
  private readonly requestFrame: () => void;
  private readonly mobile: boolean;
  private mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial> | null = null;
  private restX: Float32Array | null = null;
  private restY: Float32Array | null = null;
  private texture: THREE.Texture | null = null;
  private textureReady = false;
  private firstFrameReady = false;
  private introPlayed = false;
  private revealRequested = false;
  private animation: "idle" | "intro" | "hover" | "settle" = "idle";
  private animationStarted = 0;
  private currentAmount = 0;
  private currentPhase = 0;
  private settleAmount = 0;
  private settlePhase = 0;
  private width = 0;
  private height = 0;
  private pointerInside = false;

  private readonly onPointerEnter = () => {
    if (this.mobile || !this.textureReady) return;
    this.pointerInside = true;
    this.animation = "hover";
    this.animationStarted = performance.now();
    this.requestFrame();
  };

  private readonly onPointerLeave = () => {
    if (this.mobile || !this.textureReady) return;
    this.pointerInside = false;
    this.settleAmount = this.currentAmount;
    this.settlePhase = this.currentPhase;
    this.animation = "settle";
    this.animationStarted = performance.now();
    this.requestFrame();
  };

  constructor(
    card: HTMLElement,
    stage: WaveStage,
    textureLoader: THREE.TextureLoader,
    requestFrame: () => void,
    mobile: boolean,
  ) {
    const media = card.querySelector<HTMLElement>("[data-work-wave-thumb]");
    const image = media?.querySelector<HTMLImageElement>("img");
    if (!media || !image) throw new Error("Work flag wave requires an SSR media image.");

    this.card = card;
    this.media = media;
    this.image = image;
    this.stage = stage;
    this.textureLoader = textureLoader;
    this.requestFrame = requestFrame;
    this.mobile = mobile;

    if (!mobile) {
      card.addEventListener("pointerenter", this.onPointerEnter);
      card.addEventListener("pointerleave", this.onPointerLeave);
    }

    this.build();
  }

  private build() {
    const rect = this.media.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;

    this.disposeMesh();
    this.width = rect.width;
    this.height = rect.height;

    const geometry = new THREE.PlaneGeometry(this.width, this.height, 32, 24);
    const positions = geometry.attributes.position;
    this.restX = new Float32Array(positions.count);
    this.restY = new Float32Array(positions.count);

    for (let index = 0; index < positions.count; index += 1) {
      this.restX[index] = positions.getX(index);
      this.restY[index] = positions.getY(index);
    }

    const source = this.image.currentSrc || this.image.src;
    const texture = this.textureLoader.load(
      source,
      () => {
        this.textureReady = true;
        this.applyWave(0, 0);
        this.updatePosition();
        if (this.revealRequested) {
          this.animation = "intro";
          this.animationStarted = performance.now();
        }
        this.requestFrame();
      },
      undefined,
      () => {
        this.card.removeAttribute("data-work-wave-ready");
      },
    );
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    this.texture = texture;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        imageMap: { value: texture },
        opacity: { value: 0 },
        monochromeAmount: { value: 1 },
        planeSize: { value: new THREE.Vector2(this.width, this.height) },
        cornerRadius: { value: 8 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      depthTest: false,
      depthWrite: false,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.frustumCulled = false;
    this.stage.scene.add(this.mesh);
    this.updatePosition();
  }

  reveal() {
    if (this.introPlayed) return;
    this.introPlayed = true;
    this.revealRequested = true;
    if (!this.textureReady) return;
    this.animation = "intro";
    this.animationStarted = performance.now();
    this.requestFrame();
  }

  rebuildIfNeeded() {
    const rect = this.media.getBoundingClientRect();
    if (Math.abs(rect.width - this.width) > 2 || Math.abs(rect.height - this.height) > 2) {
      this.textureReady = false;
      this.firstFrameReady = false;
      this.card.removeAttribute("data-work-wave-ready");
      this.build();
      return;
    }
    this.updatePosition();
  }

  updatePosition() {
    if (!this.mesh) return false;
    const rect = this.media.getBoundingClientRect();
    this.mesh.position.x = rect.left + rect.width / 2 - this.stage.width / 2;
    this.mesh.position.y = this.stage.height / 2 - (rect.top + rect.height / 2);
    this.mesh.visible = rect.bottom > -160 && rect.top < this.stage.height + 160;

    const computedOpacity = Number.parseFloat(getComputedStyle(this.card).opacity || "1");
    this.mesh.material.uniforms.opacity.value = Math.max(0, Math.min(1, computedOpacity));
    return this.mesh.visible;
  }

  tick(now: number) {
    this.updatePosition();
    if (!this.mesh || !this.textureReady || this.animation === "idle") return false;

    const elapsed = now - this.animationStarted;
    if (this.animation === "intro") {
      const progress = Math.min(elapsed / 3000, 1);
      const amount = easeInOutCubic(Math.sin(Math.PI * progress));
      const phase = progress * Math.PI * 2.2;
      this.setWave(amount, phase);

      if (progress >= 1) {
        this.setWave(0, 0);
        if (this.pointerInside && !this.mobile) {
          this.animation = "hover";
          this.animationStarted = now;
        } else {
          this.animation = "idle";
        }
      }
    } else if (this.animation === "hover") {
      const cycle = (elapsed % 3000) / 3000;
      this.setWave(0.18 * Math.sin(Math.PI * cycle), cycle * Math.PI * 2);
    } else {
      const progress = Math.min(elapsed / 300, 1);
      this.setWave(
        this.settleAmount * (1 - easeInOutCubic(progress)),
        this.settlePhase,
      );
      if (progress >= 1) {
        this.setWave(0, 0);
        this.animation = "idle";
      }
    }

    return this.animation !== "idle";
  }

  markFirstFrameRendered() {
    if (!this.textureReady || this.firstFrameReady || !this.mesh?.visible) return;
    this.firstFrameReady = true;
    this.card.setAttribute("data-work-wave-ready", "");
  }

  private setWave(amount: number, phase: number) {
    this.currentAmount = amount;
    this.currentPhase = phase;
    this.applyWave(amount, phase);
  }

  private applyWave(amount: number, phase: number) {
    if (!this.mesh || !this.restX || !this.restY) return;
    const positions = this.mesh.geometry.attributes.position;

    for (let index = 0; index < positions.count; index += 1) {
      const x = this.restX[index];
      const y = this.restY[index];
      const row = 1 - (y / this.height + 0.5);
      const depth = amount
        * row
        * Math.sin(row * Math.PI * 1.2 - phase * 1.8)
        * this.width
        * 0.04;
      positions.setXYZ(index, x, y, depth);
    }
    positions.needsUpdate = true;
  }

  dispose() {
    this.card.removeEventListener("pointerenter", this.onPointerEnter);
    this.card.removeEventListener("pointerleave", this.onPointerLeave);
    this.card.removeAttribute("data-work-wave-ready");
    this.disposeMesh();
  }

  private disposeMesh() {
    if (!this.mesh) return;
    this.stage.scene.remove(this.mesh);
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    this.texture?.dispose();
    this.mesh = null;
    this.texture = null;
  }
}

export function initWorkFlagWave(route: HTMLElement) {
  const cardElements = Array.from(
    route.querySelectorAll<HTMLElement>("[data-work-route-card]"),
  );
  if (!cardElements.length) return () => {};

  const canvas = document.createElement("canvas");
  canvas.className = "work-route__wave-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
  } catch {
    canvas.remove();
    route.setAttribute("data-work-wave-failed", "");
    return () => route.removeAttribute("data-work-wave-failed");
  }

  const mobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 20000);
  const stage: WaveStage = {
    canvas,
    renderer,
    scene,
    camera,
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const resizeStage = () => {
    stage.width = window.innerWidth;
    stage.height = window.innerHeight;
    const fieldOfView = THREE.MathUtils.degToRad(camera.fov);
    camera.aspect = stage.width / stage.height;
    camera.position.set(0, 0, stage.height * 0.5 / Math.tan(fieldOfView * 0.5));
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5));
    renderer.setSize(stage.width, stage.height, false);
  };
  resizeStage();

  let disposed = false;
  let frame = 0;
  let resizeTimer = 0;
  let sectionVisible = false;
  let contextLost = false;

  const renderOnce = (now = performance.now()) => {
    // A frame scheduled directly by an active wave animation also lands here.
    // Clear its id before deciding whether another frame is needed; otherwise
    // the last animation frame leaves `frame` truthy forever and later Lenis /
    // native scroll events can no longer resynchronise the fixed canvas.
    frame = 0;
    if (disposed || contextLost || document.hidden || !sectionVisible) return;
    let keepAnimating = false;
    let hasVisibleMesh = false;

    cards.forEach((card) => {
      if (card.tick(now)) keepAnimating = true;
      if (card.updatePosition()) hasVisibleMesh = true;
    });

    // Explicitly clear the transparent fixed canvas on every event frame.
    // Some WebGL compositors retain the previous buffer after all meshes turn
    // invisible, which otherwise leaves a ghost card over the intro on reverse.
    renderer.clear(true, true, true);
    if (hasVisibleMesh) {
      renderer.render(scene, camera);
      cards.forEach((card) => card.markFirstFrameRendered());
    }

    if (keepAnimating) frame = window.requestAnimationFrame(renderOnce);
  };

  const requestRender = () => {
    if (frame || disposed || contextLost || document.hidden || !sectionVisible) return;
    frame = window.requestAnimationFrame(renderOnce);
  };

  const textureLoader = new THREE.TextureLoader();
  const cards = cardElements.map(
    (card) => new WaveCard(card, stage, textureLoader, requestRender, mobile),
  );

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const card = cards.find((item) => item.card === entry.target);
      if (card?.card.hasAttribute("data-work-card-revealed")) card.reveal();
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -5% 0px" });
  cards.forEach((card) => cardObserver.observe(card.card));

  const revealObserver = new MutationObserver((entries) => {
    entries.forEach((entry) => {
      const card = cards.find((item) => item.card === entry.target);
      if (card?.card.hasAttribute("data-work-card-revealed")) card.reveal();
    });
  });
  cards.forEach((card) => revealObserver.observe(card.card, {
    attributes: true,
    attributeFilter: ["data-work-card-revealed"],
  }));

  const sectionObserver = new IntersectionObserver(([entry]) => {
    sectionVisible = Boolean(entry?.isIntersecting);
    canvas.toggleAttribute("data-work-wave-visible", sectionVisible);
    if (!sectionVisible && frame) {
      window.cancelAnimationFrame(frame);
      frame = 0;
    } else if (sectionVisible) {
      requestRender();
    }
  }, { threshold: 0, rootMargin: "160px 0px" });
  sectionObserver.observe(route);

  const onScroll = () => requestRender();
  const onResize = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      resizeStage();
      cards.forEach((card) => card.rebuildIfNeeded());
      requestRender();
    }, 180);
  };
  const onVisibilityChange = () => {
    if (document.hidden && frame) {
      window.cancelAnimationFrame(frame);
      frame = 0;
    } else {
      requestRender();
    }
  };
  const onContextLost = (event: Event) => {
    event.preventDefault();
    contextLost = true;
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
    route.setAttribute("data-work-wave-failed", "");
    cards.forEach((card) => card.card.removeAttribute("data-work-wave-ready"));
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
  document.addEventListener("visibilitychange", onVisibilityChange);
  canvas.addEventListener("webglcontextlost", onContextLost);
  route.setAttribute("data-work-wave-mounted", "");
  requestRender();

  return () => {
    disposed = true;
    if (frame) window.cancelAnimationFrame(frame);
    window.clearTimeout(resizeTimer);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    canvas.removeEventListener("webglcontextlost", onContextLost);
    cardObserver.disconnect();
    revealObserver.disconnect();
    sectionObserver.disconnect();
    cards.forEach((card) => card.dispose());
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
    route.removeAttribute("data-work-wave-mounted");
    route.removeAttribute("data-work-wave-failed");
  };
}
