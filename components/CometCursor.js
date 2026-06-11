"use client";

import { useEffect, useRef } from "react";

export default function CometCursor() {
  const ref = useRef(null);

  useEffect(() => {
    // Only on devices with a real pointer, and only if motion is OK
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w, h, raf;
    let particles = [];
    let trail = []; // recent head positions -> comet streak
    let mx = -100, my = -100;        // real cursor
    let hx = -100, hy = -100;        // eased comet head
    let lastX = -100, lastY = -100;  // last spawn point
    let lastMove = 0;                // for idle fade
    let started = false;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn(x, y, speed) {
      particles.push({
        x: x + (Math.random() - 0.5) * 4,
        y: y + (Math.random() - 0.5) * 4,
        vx: (Math.random() - 0.5) * 0.6 - speed * 0.02,
        vy: (Math.random() - 0.5) * 0.6 - 0.05,
        life: 1,
        r: 0.8 + Math.random() * 1.6,
        kind: Math.random() < 0.08 ? "spark" : Math.random() > 0.35 ? "amber" : "blue"
      });
    }

    function onMove(e) {
      mx = e.clientX; my = e.clientY;
      lastMove = performance.now();
      if (!started) {
        // first event: snap everything to the cursor so there's no streak from offscreen
        hx = mx; hy = my; lastX = mx; lastY = my; started = true;
        return;
      }
      // spawn particles INTERPOLATED along the path so fast flicks leave no gaps
      const dist = Math.hypot(mx - lastX, my - lastY);
      const steps = Math.min(14, Math.max(1, Math.floor(dist / 6)));
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        if (Math.random() < 0.8) spawn(lastX + (mx - lastX) * t, lastY + (my - lastY) * t, dist);
      }
      lastX = mx; lastY = my;
      if (particles.length > 260) particles.splice(0, particles.length - 260);
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // ease the head toward the cursor — this lag is what makes it feel like a comet
      hx += (mx - hx) * 0.3;
      hy += (my - hy) * 0.3;
      if (started) {
        trail.push({ x: hx, y: hy });
        if (trail.length > 14) trail.shift();
      }

      const idle = performance.now() - lastMove;
      const headAlpha = idle > 900 ? Math.max(0, 1 - (idle - 900) / 700) : 1;

      ctx.globalCompositeOperation = "lighter";

      // comet streak: fading polyline through recent head positions
      if (trail.length > 2 && headAlpha > 0) {
        ctx.lineCap = "round";
        for (let i = 1; i < trail.length; i++) {
          const t = i / trail.length;
          ctx.globalAlpha = t * t * 0.28 * headAlpha;
          ctx.strokeStyle = "#FFB35C";
          ctx.lineWidth = t * 5;
          ctx.beginPath();
          ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
          ctx.lineTo(trail[i].x, trail[i].y);
          ctx.stroke();
        }
      }

      // particles
      for (const p of particles) {
        if (p.kind === "spark") {
          ctx.globalAlpha = p.life * 0.9;
          ctx.fillStyle = "#FFFFFF";
        } else {
          ctx.globalAlpha = p.life * 0.5;
          ctx.fillStyle = p.kind === "amber" ? "#FFB35C" : "#5CC8FF";
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        p.life -= p.kind === "spark" ? 0.045 : 0.025;
      }
      particles = particles.filter((p) => p.life > 0);

      // comet head: bright core + glow, sized up slightly with speed
      if (started && headAlpha > 0) {
        const speed = Math.hypot(mx - hx, my - hy);
        const R = 12 + Math.min(10, speed * 0.35);
        const g = ctx.createRadialGradient(hx, hy, 0, hx, hy, R);
        g.addColorStop(0, `rgba(255,236,200,${0.5 * headAlpha})`);
        g.addColorStop(0.35, `rgba(255,179,92,${0.3 * headAlpha})`);
        g.addColorStop(1, "transparent");
        ctx.globalAlpha = 1;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(hx, hy, R, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    }

    function onVis() {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]" />;
}
