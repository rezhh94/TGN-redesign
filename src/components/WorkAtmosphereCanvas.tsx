"use client";

import { useEffect, useRef } from "react";

export function WorkAtmosphereCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 768px)").matches;
    if (!canvas || reduced || compact) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const frameCount = 10;
    const density = 0.7;
    const playbackFps = 25;
    const scrollHoldMs = 180;
    const resizeDebounceMs = 160;
    let width = 0;
    let height = 0;
    let frames: ImageData[] = [];
    let frameIndex = 0;
    let animationFrame = 0;
    let playbackTimer = 0;
    let resizeTimer = 0;
    let holdUntil = 0;
    let running = false;

    const bakeFrames = () => {
      frames = [];
      for (let index = 0; index < frameCount; index += 1) {
        const frame = context.createImageData(width, height);
        const pixels = new Uint32Array(frame.data.buffer);
        for (let pixel = 0; pixel < pixels.length; pixel += 1) {
          if (Math.random() < density) pixels[pixel] = 0xffffffff;
        }
        frames.push(frame);
      }
    };

    const stop = () => {
      running = false;
      window.clearTimeout(playbackTimer);
      window.cancelAnimationFrame(animationFrame);
    };

    const tick = () => {
      if (!running) return;
      animationFrame = 0;
      if (performance.now() >= holdUntil && document.visibilityState !== "hidden") {
        frameIndex = (frameIndex + 1) % frameCount;
        context.putImageData(frames[frameIndex], 0, 0);
      }
      playbackTimer = window.setTimeout(() => {
        animationFrame = window.requestAnimationFrame(tick);
      }, 1000 / playbackFps);
    };

    const start = () => {
      if (running) return;
      running = true;
      animationFrame = window.requestAnimationFrame(tick);
    };

    const setup = () => {
      stop();
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      context.clearRect(0, 0, width, height);
      bakeFrames();
      context.putImageData(frames[0], 0, 0);
      start();
    };

    const holdGrain = () => {
      holdUntil = performance.now() + scrollHoldMs;
    };

    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setup, resizeDebounceMs);
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    window.addEventListener("scroll", holdGrain, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    setup();

    return () => {
      stop();
      window.clearTimeout(resizeTimer);
      window.removeEventListener("scroll", holdGrain);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      frames = [];
    };
  }, []);

  return <canvas ref={canvasRef} className="work-film-grain" aria-hidden="true" />;
}
