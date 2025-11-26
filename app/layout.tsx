import "./globals.css";
import type { Metadata } from "next";
import { IBM_Plex_Mono, PT_Serif, Inter, Inria_Serif } from "next/font/google";

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
  style: ["italic", "normal"],
});
const inriaSerif = Inria_Serif({
  variable: "--font-inria-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: 'Reroute',
  description: 'Reroute - Strategic Partner',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${mono.variable} ${serif.variable} ${inter.variable} ${inriaSerif.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
