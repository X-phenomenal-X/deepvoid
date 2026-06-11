"use client";
import { useEffect, useRef } from "react";

export default function Starfield() {
  const ref = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w, h, stars = [], shooting = null, raf;
    let mouseX = 0, mouseY = 0, visible = true;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(260, Math.floor((w * h) / 7000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random(), // depth 0..1
        r: Math.random() * 1.3 + 0.3,
        tw: Math.random() * Math.PI * 2,
        tws: 0.005 + Math.random() * 0.02
      }));
    }

    function frame() {
      if (!visible) { raf = requestAnimationFrame(frame); return; }
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.tw += s.tws;
        const a = 0.35 + 0.5 * (0.5 + 0.5 * Math.sin(s.tw)) * (0.4 + s.z * 0.6);
        const px = s.x + mouseX * s.z * 14;
        const py = s.y + mouseY * s.z * 14;
        ctx.beginPath();
        ctx.arc(px, py, s.r * (0.6 + s.z * 0.7), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,237,245,${a})`;
        ctx.fill();
      }
      if (!reduced) {
        if (!shooting && Math.random() < 0.004) {
          shooting = {
            x: Math.random() * w * 0.7,
            y: Math.random() * h * 0.4,
            vx: 7 + Math.random() * 5,
            vy: 2.5 + Math.random() * 2,
            life: 1
          };
        }
        if (shooting) {
          shooting.x += shooting.vx;
          shooting.y += shooting.vy;
          shooting.life -= 0.022;
          const g = ctx.createLinearGradient(
            shooting.x, shooting.y,
            shooting.x - shooting.vx * 8, shooting.y - shooting.vy * 8
          );
          g.addColorStop(0, `rgba(255,179,92,${Math.max(shooting.life, 0)})`);
          g.addColorStop(1, "rgba(255,179,92,0)");
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(shooting.x, shooting.y);
          ctx.lineTo(shooting.x - shooting.vx * 8, shooting.y - shooting.vy * 8);
          ctx.stroke();
          if (shooting.life <= 0 || shooting.x > w + 100) shooting = null;
        }
      }
      raf = requestAnimationFrame(frame);
    }

    function onMouse(e) {
      if (reduced) return;
      mouseX = (e.clientX / w - 0.5) * 2;
      mouseY = (e.clientY / h - 0.5) * 2;
    }
    function onVis() { visible = document.visibilityState === "visible"; }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    document.addEventListener("visibilitychange", onVis);
    if (reduced) {
      // draw a single static frame
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(232,237,245,0.5)";
        ctx.fill();
      }
    } else {
      raf = requestAnimationFrame(frame);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
