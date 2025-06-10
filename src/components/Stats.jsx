"use client";

import { motion } from "framer-motion";

const Stats = () => {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center"
        >
          <motion.div
            className="group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="absolute -inset-1 rounded-full bg-[#FFFFE3] opacity-0 filter blur-sm"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.15 }}
              transition={{ duration: 0.3 }}
            />
            <div className="relative">
              <h3 className="text-4xl font-bold mb-2 text-white dark:text-slate-900/90">100+</h3>
              <p className="text-gray-400 dark:text-slate-400">Projects</p>
            </div>
          </motion.div>

          <motion.div
            className="group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="absolute -inset-1 rounded-full bg-[#FFFFE3] opacity-0 filter blur-sm"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.15 }}
              transition={{ duration: 0.3 }}
            />
            <div className="relative">
              <h3 className="text-4xl font-bold mb-2 text-white dark:text-slate-900/90">500+</h3>
              <p className="text-gray-400 dark:text-slate-400">Contributors</p>
            </div>
          </motion.div>

          <motion.div
            className="group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="absolute -inset-1 rounded-full bg-[#FFFFE3] opacity-0 filter blur-sm"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.15 }}
              transition={{ duration: 0.3 }}
            />
            <div className="relative">
              <h3 className="text-4xl font-bold mb-2 text-white dark:text-slate-900/90">10+</h3>
              <p className="text-gray-400 dark:text-slate-400">Countries</p>
            </div>
          </motion.div>

          <motion.div
            className="group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="absolute -inset-1 rounded-full bg-[#FFFFE3] opacity-0 filter blur-sm"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.15 }}
              transition={{ duration: 0.3 }}
            />
            <div className="relative">
              <h3 className="text-4xl font-bold mb-2 text-white dark:text-slate-900/90">2025</h3>
              <p className="text-gray-400 dark:text-slate-400">Founded</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Stats;
