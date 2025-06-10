"use client";

import { motion } from "framer-motion";

const Stats = () => {
  return (
    <div className="bg-background py-24">
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
            <div className="text-6xl md:text-xl lg:text-7xl font-bold text-blue-500 group-hover:text-blue-400 transition-colors">
              1600+
            </div>
            <div className="mt-4 text-xl md:text-2xl text-gray-400">Participants</div>
          </motion.div>
          <motion.div
            className="group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-6xl md:text-7xl lg:text-7xl font-bold text-blue-500 group-hover:text-blue-400 transition-colors">
              400+
            </div>
            <div className="mt-4 text-xl md:text-2xl text-gray-400">Projects</div>
          </motion.div>
          <motion.div
            className="group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-6xl md:text-7xl lg:text-7xl font-bold text-blue-500 group-hover:text-blue-400 transition-colors">
              45+
            </div>
            <div className="mt-4 text-xl md:text-2xl text-gray-400">HackNights</div>
          </motion.div>
          <motion.div
            className="group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-6xl md:text-7xl lg:text-7xl font-bold text-blue-500 group-hover:text-blue-400 transition-colors">
              5
            </div>
            <div className="mt-4 text-xl md:text-2xl text-gray-400">Offline HackNights</div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Stats;
