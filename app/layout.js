import "./globals.css";
import { Space_Grotesk, IBM_Plex_Mono, Inter, Unbounded } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Starfield from "@/components/Starfield";
import CometCursor from "@/components/CometCursor";
import AlienObserver from "@/components/AlienObserver";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const hero = Unbounded({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-hero" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });
const body = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://deepvoid-woad.vercel.app"),
  title: {
    default: "DeepVoid — live trackers for humanity's deepest space missions",
    template: "%s · DeepVoid"
  },
  description:
    "Live Voyager distance trackers, a real-time solar system, asteroid close approaches, eclipse countdowns, NASA imagery, and a searchable exoplanet database.",
  openGraph: {
    title: "DeepVoid — the deep void, in real time",
    description: "Live solar system, Voyager telemetry, asteroid close approaches, eclipse countdowns, and the newest exoplanets.",
    type: "website",
    url: "https://deepvoid-woad.vercel.app",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "DeepVoid — live solar system" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "DeepVoid — the deep void, in real time",
    description: "Live solar system, Voyager telemetry, asteroid watch, eclipse countdowns.",
    images: ["/og.png"]
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} ${hero.variable}`}>
      <body className={`${body.className} bg-void text-starlight antialiased`}>
        <Starfield />
        <div className="nebula nebula-a" aria-hidden="true" />
        <div className="nebula nebula-b" aria-hidden="true" />
        <div className="nebula nebula-c" aria-hidden="true" />
        <CometCursor />
        <AlienObserver />
        <Navbar />
        <main className="mx-auto max-w-7xl px-5 sm:px-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
