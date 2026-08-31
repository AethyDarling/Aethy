"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";
import { theme } from "@/content/theme";

// Ambient "construction tick" field: short, fine line segments — the marks
// an artist leaves when measuring proportions — drifting slowly behind the
// hero. The cursor bends nearby ticks toward its direction of travel.
// Flat single-color strokes only. Cost is capped: small fixed count,
// devicePixelRatio clamped, and the loop pauses when the hero is
// off-screen or the tab is hidden.

type Tick = {
  x: number;
  y: number;
  angle: number;
  baseAngle: number;
  len: number;
  drift: number;
  phase: number;
};

export default function HeroTicks({
  pointerX,
  pointerY,
}: {
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cfg = theme.hero;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let ticks: Tick[] = [];

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ticks = Array.from({ length: cfg.particleCount }, () => {
        const angle = Math.random() * Math.PI;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          angle,
          baseAngle: angle,
          len: 8 + Math.random() * 18,
          drift: (0.05 + Math.random() * 0.12) * cfg.particleSpeed,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let running = true;
    let visible = true;
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);
    const onVis = () => {
      running = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);

    let raf = 0;
    let t = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!running || !visible) return;
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = theme.colors.line;
      ctx.lineWidth = 1;

      const mx = ((pointerX.get() + 1) / 2) * w;
      const my = ((pointerY.get() + 1) / 2) * h;

      for (const tk of ticks) {
        tk.y -= tk.drift;
        tk.x += Math.sin(t * 0.4 + tk.phase) * 0.06;
        if (tk.y < -20) {
          tk.y = h + 20;
          tk.x = Math.random() * w;
        }
        // Cursor influence: nearby ticks rotate to point along the
        // line between themselves and the pointer.
        const dx = mx - tk.x;
        const dy = my - tk.y;
        const dist = Math.hypot(dx, dy);
        const target =
          dist < 180 ? Math.atan2(dy, dx) : tk.baseAngle + Math.sin(t * 0.3 + tk.phase) * 0.15;
        // Ease the angle toward its target.
        let da = target - tk.angle;
        while (da > Math.PI) da -= Math.PI * 2;
        while (da < -Math.PI) da += Math.PI * 2;
        tk.angle += da * 0.06;

        const c = Math.cos(tk.angle) * tk.len * 0.5;
        const s = Math.sin(tk.angle) * tk.len * 0.5;
        ctx.globalAlpha = dist < 180 ? 0.9 : 0.45;
        ctx.beginPath();
        ctx.moveTo(tk.x - c, tk.y - s);
        ctx.lineTo(tk.x + c, tk.y + s);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [pointerX, pointerY]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
