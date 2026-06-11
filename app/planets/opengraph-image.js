import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Eight worlds, one star — interactive planet profiles on DeepVoid";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PLANETS = [
  { color: "#9FA6B2", d: 26 },
  { color: "#E8C97D", d: 44 },
  { color: "#5CC8FF", d: 46 },
  { color: "#E07B54", d: 34 },
  { color: "#D9A066", d: 110 },
  { color: "#E5CFA1", d: 92 },
  { color: "#9BD8DC", d: 62 },
  { color: "#6E8FE8", d: 60 }
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: "linear-gradient(160deg, #05070D 55%, #0B1226 100%)",
          color: "#EDF2FA",
          fontFamily: "sans-serif"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: "#FFB35C", fontSize: 22, letterSpacing: 6 }}>
            THE NEIGHBORHOOD · INTERACTIVE
          </div>
          <div style={{ display: "flex", fontSize: 80, fontWeight: 700, marginTop: 22, lineHeight: 1.05 }}>
            Eight worlds, one star.
          </div>
          <div style={{ display: "flex", color: "#9AA8C4", fontSize: 28, marginTop: 24 }}>
            Real NASA photos · temps, moons, gravity · what you&apos;d weigh there
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 34 }}>
            {PLANETS.map((p, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  width: p.d,
                  height: p.d,
                  borderRadius: 9999,
                  background: p.color,
                  boxShadow: `0 0 26px ${p.color}66`
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", color: "#FFB35C", fontSize: 22 }}>
            deepvoid-woad.vercel.app/planets
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
