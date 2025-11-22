import "./globals.css";
import { IBM_Plex_Mono, PT_Serif, Inter, Inria_Serif } from "next/font/google";
import { IntroAnimation } from "@/components/IntroAnimation";
import { Footer } from "@/components/Footer";

const serif = PT_Serif({
  variable: "--font-serif",
  style: ["normal", "italic"],
  subsets: ["latin"],
  weight: ["400", "700"],
});
const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500", "700"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const inriaSerif = Inria_Serif({
  variable: "--font-inria-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${mono.variable} ${serif.variable} ${inter.variable} ${inriaSerif.variable}`}>
      <body>
        <IntroAnimation />
        {children}
      </body>
    </html>
  );
}
