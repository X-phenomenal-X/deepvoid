import "./globals.css";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Starfield from "@/components/Starfield";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
  metadataBase: new URL("https://deepvoid-woad.vercel.app"),
  title: {
    default: "DeepVoid — live data from humanity's deepest space missions",
    template: "%s · DeepVoid"
  },
  description:
    "Watch Voyager 1 leave the solar system in real time. Live planet positions, launch countdowns, the ISS overhead, and dispatches from the edge of the void.",
  openGraph: {
    title: "DeepVoid",
    description: "Live data from humanity's deepest space missions.",
    type: "website",
    url: "https://deepvoid-woad.vercel.app"
  },
  twitter: { card: "summary_large_image", title: "DeepVoid" },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body className={`${body.className} bg-void text-starlight antialiased`}>
        <Starfield />
        <Navbar />
        <main className="mx-auto max-w-6xl px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
