import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "RAHIL MOVIES",
  description: "A premium modern cinematic web application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen relative selection:bg-white/20 overflow-hidden bg-black text-white">
        
        {/* Background Videos */}
        <div className="fixed inset-0 z-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hidden md:block w-full h-full object-cover opacity-70"
            src={siteConfig.LANDSCAPE_VIDEO_URL}
          />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="block md:hidden w-full h-full object-cover opacity-70"
            src={siteConfig.PORTRAIT_VIDEO_URL}
          />
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />
          <div className="absolute inset-0 bg-black/20 pointer-events-none backdrop-blur-[2px]" />
        </div>
        
        <Navbar />

        {/* Main Content */}
        <main className="relative z-10 w-full min-h-screen pt-24 px-6 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
