"use client";

import { motion } from "framer-motion";

export default function Copyright() {
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
          Legal & Copyright
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="space-y-6 text-sm md:text-base font-light leading-relaxed text-white/70"
        >
          <p>
            © {new Date().getFullYear()} RAHIL MOVIES. All rights reserved.
          </p>
          <p className="text-white/50 text-sm">
            This platform is strictly intended for the distribution and presentation of cinematic content for which the owner has full legal rights, licensing, or explicit permission to share.
          </p>
          <p className="text-white/50 text-sm">
            Unauthorized duplication, redistribution, or modification of the provided materials is prohibited.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
