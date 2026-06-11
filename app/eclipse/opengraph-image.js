import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Total Solar Eclipse — August 12, 2026 — live countdown on DeepVoid";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: "linear-gradient(135deg, #05070D 60%, #0A1020 100%)",
          color: "#EDF2FA",
          fontFamily: "sans-serif"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ display: "flex", color: "#FFB35C", fontSize: 22, letterSpacing: 6 }}>
            AUGUST 12, 2026 · LIVE COUNTDOWN
          </div>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, marginTop: 24, lineHeight: 1.05 }}>
            The sky goes dark.
          </div>
          <div style={{ display: "flex", color: "#9AA8C4", fontSize: 28, marginTop: 28, lineHeight: 1.4 }}>
            Total solar eclipse over Greenland, Iceland & Spain — the first over mainland Europe since 1999.
          </div>
          <div style={{ display: "flex", color: "#FFB35C", fontSize: 22, marginTop: 36 }}>
            deepvoid-woad.vercel.app/eclipse
          </div>
        </div>

        {/* eclipse: black disc with corona */}
        <div
          style={{
            display: "flex",
            width: 320,
            height: 320,
            borderRadius: 9999,
            background: "#05070D",
            boxShadow: "0 0 90px 28px rgba(255,200,120,0.55), 0 0 28px 8px rgba(255,235,200,0.9)"
          }}
        />
      </div>
    ),
    { ...size }
  );
}
