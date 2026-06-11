// Placeholder ad container. When AdSense is approved, paste the ad unit
// code inside this component — the layout already reserves the space so
// nothing shifts when ads go live.
export default function AdSlot({ size = "banner" }) {
  const h = size === "banner" ? "min-h-[90px]" : "min-h-[250px]";
  return (
    <div
      className={`${h} flex items-center justify-center rounded border border-dashed border-hairline text-[10px] font-mono uppercase tracking-widest text-dim/50`}
      aria-hidden="true"
    >
      ad space
    </div>
  );
}
