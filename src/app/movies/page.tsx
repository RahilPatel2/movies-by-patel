"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Download, X, PlayCircle } from "lucide-react";
import { siteConfig } from "@/config";
import React from "react";

export default function Movies() {
  const [bannerTrigger, setBannerTrigger] = useState<"download" | "watch" | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCloseBanner = () => {
    const trigger = bannerTrigger;
    
    // Smoothly close the advertisement overlay
    setBannerTrigger(null);
    
    // Trigger download/watch synchronously in the click handler 
    // to preserve the user-gesture context and bypass popup/download blockers
    if (trigger === "watch") {
      window.location.href = siteConfig.WATCH_NOW_URL;
    } else if (trigger === "download") {
      window.location.href = siteConfig.DOWNLOAD_URL;
    }
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 100, mass: 1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-200, 200], [10, -10]);
  const rotateY = useTransform(springX, [-200, 200], [-10, 10]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Animation variants for staggered cinematic reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 120,
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-start w-full min-h-[calc(100dvh-100px)] pt-8 md:pt-16 pb-[calc(env(safe-area-inset-bottom,20px)+40px)] md:pb-16 relative z-10 md:justify-center">
      
      {/* Download Video Banner Overlay via Portal to escape stacking context */}
      {mounted && createPortal(
        <AnimatePresence>
          {bannerTrigger !== null && (
            <div 
              className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 pointer-events-none"
              style={{ width: "100vw", height: "100dvh" }}
            >
              <motion.div
                initial={{ opacity: 0, y: -40, scale: 0.95, rotateX: 15 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                style={{ perspective: 1000 }}
                className="relative h-full max-h-[94dvh] md:max-h-[92dvh] max-w-[95vw] md:max-w-none aspect-[9/16] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.9)] border border-white/20 bg-black/95 pointer-events-auto backdrop-blur-3xl"
              >
                {/* Close Button */}
                <button
                  onClick={handleCloseBanner}
                  className="absolute top-3 right-3 z-50 p-2.5 rounded-full bg-black/50 text-white/90 hover:text-white hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-md border border-white/10"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                
                {/* Video Content */}
                <div className="relative w-full h-full bg-black">
                  <video
                    src={siteConfig.DOWNLOAD_VIDEO_URL}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] pointer-events-none" />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Mobile-first cinematic container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-lg md:max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-center gap-4 md:gap-16 px-4 md:px-0 h-full mt-2 md:mt-0 mb-auto md:mb-0"
      >
        
        {/* Dominant Poster Section - Scaled by VH on mobile */}
        <motion.div 
          variants={itemVariants}
          onMouseMove={handleMouse}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1200, rotateX, rotateY }}
          className="relative shrink-0 w-auto h-[48vh] sm:h-[55vh] md:h-auto md:w-[400px] aspect-[2/3]"
        >
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)] border border-white/10"
          >
            {/* Subtle glass edge highlight */}
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl border-2 border-white/5 pointer-events-none z-20" />
            
            <Image
              src={siteConfig.MOVIE_POSTER_URL}
              alt="RAHIL MOVIES"
              fill
              priority
              className="object-cover"
              sizes="(max-height: 800px) 45vh, 400px"
            />
            
            {/* Inner glow and vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(255,255,255,0.05)] z-20 pointer-events-none" />
          </motion.div>
        </motion.div>

        {/* Cinematic Information & Actions */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full pt-2 md:pt-16 max-w-sm">
          
          <motion.div variants={itemVariants} className="mb-1 md:mb-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.2em] text-white uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              RAHIL MOVIES
            </h2>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-4 md:mb-12">
            <p className="text-xs sm:text-sm md:text-base text-white/50 tracking-[0.3em] uppercase font-light">
              Premium Release
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full flex flex-col gap-3">
            <motion.button
              onClick={() => setBannerTrigger("download")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden w-full py-4 md:py-5 rounded-2xl flex items-center justify-center gap-3 bg-white/10 text-white font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/15 hover:bg-white/20 hover:border-white/30 hover:shadow-[0_20px_40px_rgba(255,255,255,0.1)] group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
              
              <Download className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110" />
              <span>Download File</span>
            </motion.button>

            <motion.button
              onClick={() => setBannerTrigger("watch")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden w-full py-4 md:py-5 rounded-2xl flex items-center justify-center gap-3 bg-transparent text-white font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-300 border border-white/10 hover:border-white/40 hover:bg-white/5 group"
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent transition-opacity duration-500 pointer-events-none" />
              
              <PlayCircle className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500 group-hover:scale-110" />
              <span>Watch Now</span>
            </motion.button>
          </motion.div>

        </div>
      </motion.div>

    </div>
  );
}
