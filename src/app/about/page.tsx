"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto text-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="glass-panel p-10 md:p-16 rounded-3xl"
      >
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-xs uppercase tracking-[0.4em] text-white/40 mb-6"
        >
          About The Vision
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg md:text-2xl font-light leading-relaxed text-white/90"
        >
          An experimental cinematic web experience designed to challenge gravity, blend fluid motion with high-definition assets, and redefine minimalist digital presentation.
        </motion.p>
      </motion.div>
    </div>
  );
}
