import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])


  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 px-4 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className={`max-w-3xl mx-auto backdrop-blur-md rounded-xl ${
        scrolled 
          ? 'bg-[#FFFFE3]/10 border border-[#FFFFE3]/20 shadow-lg' 
          : 'bg-[#FFFFE3]/5 border border-[#FFFFE3]/10'
      } transition-all duration-300`}>
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0 relative cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-[#FFFFE3] font-clash font-medium text-2xl relative z-10 tracking-tight">
              Saturday HackNight
            </span>
            {/* Logo glow effect */}
            <motion.div 
              className="absolute -inset-1 rounded-full bg-[#FFFFE3] opacity-0 filter blur-sm"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.15 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Register Now Button */}
          <motion.button
            className="px-6 py-2.5 border-2 border-blue-500 text-blue-500 rounded-full font-medium text-sm hover:border-blue-400 hover:text-blue-400 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          >
            <span className="relative z-10 font-clash font-medium">Register Now</span>
            <motion.div 
              className="absolute -inset-1 rounded-full bg-blue-500 opacity-0 filter blur-sm"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.15 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        
        </div>
      </div>
      
      {/* Glassmorphism highlight accent */}
      <div className="absolute w-3xl left-1/2 transform -translate-x-1/2 -bottom-1 h-[1px] bg-gradient-to-r from-transparent via-[#FFFFE3]/20 to-transparent"></div>
    </motion.nav>
  )
}

export default Navbar;

// Add this at the top of the file
Navbar.displayName = 'Navbar';