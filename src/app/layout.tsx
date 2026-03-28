import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Background3D from "@/components/Background3D";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgressBar from "@/components/ScrollProgressBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nikhil Jeeva | AI Builder & RL Developer",
  description: "Futuristic portfolio of Nikhil Jeeva - AI Builder, RL Developer, and Full Stack Engineer.",
};

import { AudioProvider } from "@/components/AudioProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-background text-foreground antialiased selection:bg-neon-blue/30`}>
        <AudioProvider>
          <ScrollProgressBar />
          <Background3D />
          <CustomCursor />
          <SmoothScroll>
            <Navbar />
            <main className="relative z-0">
              {children}
            </main>
          </SmoothScroll>
        </AudioProvider>
      </body>
    </html>
  );
}

