"use client";

import { useRef } from "react";

// Wraps a CTA so it leans gently toward the cursor — premium micro-interaction.
export default function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  }

  return (
    <span ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className="magnetic inline-block">
      {children}
    </span>
  );
}
