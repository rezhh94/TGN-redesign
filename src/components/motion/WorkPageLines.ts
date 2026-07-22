type ControlPoint = {
  x: number;
  y: number;
};

type PathPoint = ControlPoint & {
  nx: number;
  ny: number;
  t: number;
};

type CardAnchor = {
  element: HTMLElement;
  x: number;
  y: number;
  opacity: number;
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

function interpolateByLength(
  from: ControlPoint,
  to: ControlPoint,
  fromLength: number,
  toLength: number,
  at: number,
): ControlPoint {
  if (Math.abs(toLength - fromLength) < 1e-10) return { ...from };
  const progress = (at - fromLength) / (toLength - fromLength);
  return {
    x: from.x + (to.x - from.x) * progress,
    y: from.y + (to.y - from.y) * progress,
  };
}

// Chord-length interpolation and 200 samples per control segment match the
// first-party /work PageLines construction without importing its bundle.
function smoothPath(controls: ControlPoint[]): PathPoint[] {
  const points: PathPoint[] = [];
  const controlLengths = [0];

  for (let index = 0; index < controls.length - 1; index += 1) {
    controlLengths.push(
      controlLengths[index] + Math.hypot(
        controls[index + 1].x - controls[index].x,
        controls[index + 1].y - controls[index].y,
      ),
    );
  }

  for (let index = 0; index < controls.length - 1; index += 1) {
    const previous = controls[Math.max(0, index - 1)];
    const from = controls[index];
    const to = controls[index + 1];
    const next = controls[Math.min(controls.length - 1, index + 2)];
    const previousLength = controlLengths[Math.max(0, index - 1)];
    const fromLength = controlLengths[index];
    const toLength = controlLengths[index + 1];
    const nextLength = controlLengths[Math.min(controls.length - 1, index + 2)];

    for (let sample = 0; sample <= 200; sample += 1) {
      if (sample === 0 && points.length > 0) continue;
      const at = fromLength + (sample / 200) * (toLength - fromLength);
      const a = interpolateByLength(previous, from, previousLength, fromLength, at);
      const b = interpolateByLength(from, to, fromLength, toLength, at);
      const c = interpolateByLength(to, next, toLength, nextLength, at);
      const d = interpolateByLength(a, b, previousLength, toLength, at);
      const e = interpolateByLength(b, c, fromLength, nextLength, at);
      const point = interpolateByLength(d, e, fromLength, toLength, at);
      points.push({ ...point, nx: 0, ny: 1, t: 0 });
    }
  }

  let totalLength = 0;
  const lengths = [0];
  for (let index = 1; index < points.length; index += 1) {
    totalLength += Math.hypot(
      points[index].x - points[index - 1].x,
      points[index].y - points[index - 1].y,
    );
    lengths.push(totalLength);
  }
  const safeLength = totalLength || 1;

  points.forEach((point, index) => {
    point.t = lengths[index] / safeLength;
    const previous = points[Math.max(0, index - 1)];
    const next = points[Math.min(points.length - 1, index + 1)];
    const dx = next.x - previous.x;
    const dy = next.y - previous.y;
    const magnitude = Math.hypot(dx, dy) || 1;
    point.nx = -dy / magnitude;
    point.ny = dx / magnitude;
  });

  return points;
}

export function initWorkPageLines(): () => void {
  const section = document.querySelector<HTMLElement>(".work-proof");
  const route = section?.querySelector<HTMLElement>("[data-work-route]");
  const header = route?.querySelector<HTMLElement>("[data-work-route-header]");
  const canvas = route?.querySelector<HTMLCanvasElement>("[data-work-route-lines]");
  const contact = route?.querySelector<HTMLElement>("[data-work-route-contact]");
  const cards = route
    ? Array.from(route.querySelectorAll<HTMLElement>("[data-work-route-card]"))
    : [];

  if (!route || !header || !canvas || !contact || cards.length === 0) return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const context = canvas.getContext("2d");
  if (!context) return () => {};

  let width = window.innerWidth;
  let height = window.innerHeight;
  let ratio = 1;
  let paths: PathPoint[][] = [];
  let anchors: CardAnchor[] = [];
  let pathStops: number[] = [];
  let lineStart = 0;
  let lineEnd = 1;
  let progress = 0;
  let elapsed = 0;
  let lastTime = performance.now();
  let frame = 0;
  let resizeFrame = 0;
  let visible = !("IntersectionObserver" in window);

  route.setAttribute("data-work-route-ready", "");
  route.setAttribute("data-work-cards-ready", "");
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transition = "none";
  });

  const remapProgressToCheckpoints = (
    points: PathPoint[],
    checkpoints: Array<{ y: number; t: number }>,
  ) => {
    let checkpointIndex = 0;
    points.forEach((point) => {
      while (
        checkpointIndex < checkpoints.length - 2
        && point.y > checkpoints[checkpointIndex + 1].y
      ) checkpointIndex += 1;

      const from = checkpoints[checkpointIndex];
      const to = checkpoints[checkpointIndex + 1];
      const distance = to.y - from.y;
      const local = distance < 1 ? 0 : clamp((point.y - from.y) / distance);
      point.t = from.t + local * (to.t - from.t);
    });
  };

  const buildPaths = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    ratio = Math.min(window.devicePixelRatio || 1, width < 768 ? 1 : 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const scrollY = window.scrollY;
    const headerRect = header.getBoundingClientRect();
    const headerBottom = headerRect.top + scrollY + header.offsetHeight;

    // Trionn starts the paths in the viewport centre as its pinned intro
    // releases. The floating-image intro was deliberately removed here, so
    // the same visible handoff happens half a viewport before the ordinary
    // title header ends; the title has already cleared and is never pinned.
    lineStart = headerBottom;

    anchors = cards.map((element) => {
      const media = element.querySelector<HTMLElement>(".work-route__media") ?? element;
      const rect = media.getBoundingClientRect();
      return {
        element,
        x: rect.left + rect.width / 2,
        // The source path meets the top-centre of every media frame.
        y: rect.top + scrollY,
        opacity: Number.parseFloat(element.style.opacity || "0"),
      };
    });

    const contactRect = contact.getBoundingClientRect();
    const endX = contactRect.left + contactRect.width / 2;
    lineEnd = contactRect.top + scrollY + contactRect.height / 2;

    const routePoints: ControlPoint[][] = [
      [{ x: width / 2, y: lineStart }],
      [{ x: width / 2, y: lineStart }],
      [{ x: width / 2, y: lineStart }],
    ];
    let previousY = lineStart;
    const spread = randomBetween(0.15, 0.28);

    anchors.forEach((anchor) => {
      const base = randomBetween(0.25, 0.7);
      let lanes = [
        clamp(base + randomBetween(-spread, spread)),
        clamp(base + randomBetween(-spread, spread)),
        clamp(base + randomBetween(-spread, spread)),
      ].sort((a, b) => a - b);

      if (lanes[1] - lanes[0] < 0.12) lanes[1] = lanes[0] + 0.12;
      if (lanes[2] - lanes[1] < 0.12) lanes[2] = lanes[1] + 0.12;
      if (lanes[2] > 0.92) {
        lanes[2] = 0.92;
        lanes[1] = Math.min(lanes[1], lanes[2] - 0.12);
        lanes[0] = Math.min(lanes[0], lanes[1] - 0.12);
      }

      const middleY = previousY + (anchor.y - previousY) * 0.5;
      routePoints.forEach((points, laneIndex) => {
        const laneX = width * lanes[laneIndex];
        points.push({
          x: laneX + (anchor.x - laneX) * 0.3,
          y: middleY,
        });
        points.push({ x: anchor.x, y: anchor.y });
      });
      previousY = anchor.y;
    });

    const lowerTurn = lineEnd - 0.55 * height;
    const finalTurn = lineEnd - 0.28 * height;
    routePoints[0].push({ x: 0.08 * width, y: lowerTurn });
    routePoints[1].push({ x: 0.18 * width, y: lowerTurn });
    routePoints[2].push({ x: 0.3 * width, y: lowerTurn });
    routePoints[0].push({ x: 0.12 * width, y: finalTurn });
    routePoints[1].push({ x: 0.22 * width, y: finalTurn });
    routePoints[2].push({ x: 0.34 * width, y: finalTurn });

    const finalApproach = lineEnd - 0.07 * height;
    routePoints[0].push({ x: endX - 40, y: finalApproach });
    routePoints[1].push({ x: endX, y: finalApproach });
    routePoints[2].push({ x: endX + 40, y: finalApproach });
    routePoints.forEach((points) => points.push({ x: endX, y: lineEnd }));

    paths = routePoints.map(smoothPath);
    const pathRange = Math.max(1, lineEnd - lineStart);
    const checkpointYs = anchors.map((anchor) => anchor.y).concat(lineEnd);
    const checkpoints = [{ y: lineStart, t: 0 }];
    checkpointYs.forEach((y) => {
      checkpoints.push({ y, t: clamp((y - lineStart) / pathRange) });
    });
    checkpoints.push({ y: lineEnd + 1, t: 1 });
    paths.forEach((path) => remapProgressToCheckpoints(path, checkpoints));
    pathStops = [0]
      .concat(checkpointYs.map((y) => clamp((y - lineStart) / pathRange)))
      .concat(1);
  };

  const wavePoint = (point: PathPoint, lane: number): ControlPoint => {
    let suppression = 1;
    pathStops.forEach((stop) => {
      const distance = Math.abs(point.t - stop);
      if (distance < 0.03) suppression = Math.min(suppression, distance / 0.03);
    });
    const amplitude = width * 0.022;
    const phase = elapsed * 0.5 + lane * 2.1;
    const angle = point.t * Math.PI * 32 + phase;
    const normalOffset = Math.cos(angle) * amplitude * suppression;
    const tangentOffset = Math.sin(angle) * amplitude * 0.35 * suppression;
    return {
      x: point.x + point.nx * normalOffset - point.ny * tangentOffset,
      y: point.y + point.ny * normalOffset + point.nx * tangentOffset,
    };
  };

  const drawPath = (path: PathPoint[], lane: number, scrollY: number) => {
    if (progress <= 0) return null;
    context.save();
    context.strokeStyle = "rgba(48, 54, 64, 1)";
    context.lineWidth = 1;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.globalAlpha = 1;
    context.beginPath();

    let started = false;
    let head: ControlPoint | null = null;
    for (const point of path) {
      if (point.t > progress) break;
      const waved = wavePoint(point, lane);
      head = waved;
      const screenY = waved.y - scrollY;
      if (waved.x < -10 || waved.x > width + 10) {
        started = false;
        continue;
      }
      if (started) context.lineTo(waved.x, screenY);
      else {
        context.moveTo(waved.x, screenY);
        started = true;
      }
    }
    if (started) context.stroke();
    context.restore();
    return head;
  };

  const render = (time: number) => {
    frame = 0;
    if (!visible || document.hidden) return;

    const delta = Math.min((time - lastTime) / 1000, 0.05);
    lastTime = time;
    elapsed += delta;
    const scrollY = window.scrollY;
    const progressStart = Math.max(0, lineStart - height * 0.5);
    const progressEnd = Math.max(progressStart + 1, lineEnd - height * 0.5);
    const target = clamp((scrollY - progressStart) / (progressEnd - progressStart));
    progress += (target - progress) * 0.14;
    if (target === 0) progress = 0;

    context.clearRect(0, 0, width, height);
    context.save();
    context.beginPath();
    context.rect(0, 0, width, height);
    context.clip();
    const heads = paths.map((path, index) => drawPath(path, [1, 2.3, 3.7][index], scrollY));

    anchors.forEach((anchor) => {
      const screenY = anchor.y - scrollY;
      if (screenY < -20 || screenY > height + 20) return;
      context.save();
      context.fillStyle = "rgba(215, 215, 205, 1)";
      context.globalAlpha = 0.55;
      context.beginPath();
      context.arc(anchor.x, screenY, 1.5, 0, Math.PI * 2);
      context.fill();
      context.restore();
    });

    if (progress > 0.005) {
      heads.forEach((head) => {
        if (!head) return;
        const screenY = head.y - scrollY;
        if (head.x < 0 || head.x > width || screenY < -10 || screenY > height + 10) return;
        context.save();
        context.fillStyle = "rgba(200, 200, 200, 1)";
        context.globalAlpha = 0.85;
        context.beginPath();
        context.arc(head.x, screenY, 1.5, 0, Math.PI * 2);
        context.fill();
        context.restore();
      });
    }
    context.restore();

    const reachedY = Math.max(lineStart, ...heads.map((head) => head?.y ?? lineStart));
    let hasVisibleCard = false;
    anchors.forEach((anchor) => {
      const reached = reachedY >= anchor.y;
      anchor.opacity += ((reached ? 1 : 0) - anchor.opacity) * 0.09;
      if (Math.abs(anchor.opacity - (reached ? 1 : 0)) < 0.001) {
        anchor.opacity = reached ? 1 : 0;
      }
      anchor.element.style.opacity = anchor.opacity.toFixed(3);
      anchor.element.toggleAttribute("data-work-card-revealed", reached);
      if (anchor.opacity > 0.001) hasVisibleCard = true;
    });

    if (target > 0 || progress > 0.0005 || hasVisibleCard) {
      frame = window.requestAnimationFrame(render);
    }
  };

  const requestRender = () => {
    if (frame || !visible || document.hidden) return;
    lastTime = performance.now();
    frame = window.requestAnimationFrame(render);
  };

  const onScroll = () => requestRender();
  const onResize = () => {
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(() => {
      buildPaths();
      requestRender();
    });
  };
  const onVisibilityChange = () => {
    if (document.hidden && frame) {
      window.cancelAnimationFrame(frame);
      frame = 0;
    } else requestRender();
  };
  const observer = "IntersectionObserver" in window
    ? new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      route.toggleAttribute("data-work-lines-visible", visible);
      if (visible) requestRender();
      else if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    }, { rootMargin: "100% 0px" })
    : null;

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
  document.addEventListener("visibilitychange", onVisibilityChange);
  observer?.observe(route);
  route.toggleAttribute("data-work-lines-visible", visible);
  buildPaths();
  requestRender();

  return () => {
    if (frame) window.cancelAnimationFrame(frame);
    window.cancelAnimationFrame(resizeFrame);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    observer?.disconnect();
    context.clearRect(0, 0, width, height);
    route.removeAttribute("data-work-route-ready");
    route.removeAttribute("data-work-cards-ready");
    route.removeAttribute("data-work-lines-visible");
    cards.forEach((card) => {
      card.removeAttribute("data-work-card-revealed");
      card.style.removeProperty("opacity");
      card.style.removeProperty("transition");
    });
  };
}
