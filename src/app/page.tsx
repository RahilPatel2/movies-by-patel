"use client";

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { useRouter } from "next/navigation";
import { PlayCircle } from "lucide-react";
import React from "react";

export default function Home() {
  const router = useRouter();

  // Magnetic 3D Physics State
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth spring physics for magnetic pull
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 });
  
  // 3D rotation based on mouse position
  const rotateX = useTransform(springY, [-50, 50], [15, -15]);
  const rotateY = useTransform(springX, [-50, 50], [-15, 15]);

  // Spotlight highlight coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightBackground = useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.15), transparent 80%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    
    // Magnetic logic (pull button towards cursor slightly)
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // We dampen the pull by dividing by 3 to keep it "restrained and premium"
    x.set((e.clientX - centerX) / 3);
    y.set((e.clientY - centerY) / 3);

    // Spotlight logic
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  function handleMouseLeave() {
    // Smoothly snap back to origin
    x.set(0);
    y.set(0);
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div className="flex-1 flex items-center justify-center w-full">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(15px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="text-center flex flex-col items-center"
      >
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-light tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] ml-[0.3em]">
          RAHIL<span className="block md:inline"> </span>MOVIES
        </h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="mt-8 mb-12 w-24 h-[1px] bg-white/20 mx-auto"
        />

        {/* Floating Idle Wrapper */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ perspective: 1000 }}
        >
          <motion.button
            onClick={() => {
              // Compression effect before navigation
              setTimeout(() => {
                router.push('/movies');
              }, 150);
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 80, 
              mass: 1,
              delay: 1.2 
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.93, rotateX: 0, rotateY: 0 }}
            style={{ x: springX, y: springY, rotateX, rotateY }}
            className="relative overflow-hidden px-10 md:px-14 py-4 rounded-full flex items-center justify-center gap-3 bg-black/50 backdrop-blur-2xl border border-white/10 text-white font-light tracking-[0.2em] uppercase shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:border-white/20 hover:shadow-[0_20px_60px_rgba(255,255,255,0.05)] group transition-shadow duration-500 z-50"
          >
            {/* Dynamic Spotlight following cursor */}
            <motion.div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: spotlightBackground }}
            />
            
            {/* Premium Soft Inner Highlight */}
            <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none" />
            
            {/* Subtle light reflection sweeping across on entrance */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_ease-out_1] pointer-events-none" />

            <PlayCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 group-hover:text-white transition-colors duration-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
            <span className="text-sm md:text-base text-white/90 group-hover:text-white transition-colors duration-500 mt-[1px]">
              Start Watching
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
