import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'

const Home = () => {
  const containerRef = useRef(null)
  const [gridPoints, setGridPoints] = useState([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const [showParticles, setShowParticles] = useState(false)

  // Parallax effect values
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Generate grid points
  useEffect(() => {
    const generateGrid = () => {
      const points = []
      const cols = 15
      const rows = 10
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          points.push({
            id: `${i}-${j}`,
            x: (i * 100) / (cols - 1),
            y: (j * 100) / (rows - 1),
            size: 4,
            opacity: 0.15,
            highlighted: false
          })
        }
      }
      setGridPoints(points)
    }
    
    generateGrid()
    
    // Mouse position tracking for effects
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const x = clientX / window.innerWidth
      const y = clientY / window.innerHeight
      setMousePos({ x, y })
    }
    
    // Show particles after initial load for better performance
    const timer = setTimeout(() => {
      setShowParticles(true)
    }, 500)
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timer)
    }
  }, [])

  // Text animation
  const text = "Recurring hackathon to build, break, and learn by doing"
  const words = text.split(" ")

  return (
    <div 
      ref={containerRef} 
      className="bg-[#0A0A0F] mx-auto min-h-screen relative overflow-hidden perspective-1000"
    >
      {/* Enhanced background effect with depth */}
      <motion.div 
        className="absolute inset-0 z-0" 
        style={{ y: bgY }}
      >
        {/* Gradient background with enhanced colors */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-indigo-900/5 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-purple-900/10 to-transparent"></div>
        
        {/* Animated neon grid lines */}
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        
        {/* Animated aurora effect */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-[50vh] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="aurora-beam aurora-1"></div>
          <div className="aurora-beam aurora-2"></div>
          <div className="aurora-beam aurora-3"></div>
        </motion.div>
        
        {/* Dynamic blobs that follow mouse movement */}
        <motion.div 
          className="absolute w-[800px] h-[800px] rounded-full blur-[150px] bg-blue-500/15"
          style={{ 
            left: `calc(${mousePos.x * 100}% - 400px)`,
            top: `calc(${mousePos.y * 50}% - 200px)`,
            scale: 0.8 + (mousePos.y * 0.4),
            transition: 'left 2s cubic-bezier(0.2, 0.8, 0.2, 1), top 2s cubic-bezier(0.2, 0.8, 0.2, 1)' 
          }}
        />
        
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] bg-purple-500/10"
          style={{ 
            right: `calc(${(1-mousePos.x) * 100}% - 300px)`,
            bottom: `calc(${(1-mousePos.y) * 50}% - 150px)`,
            scale: 0.7 + ((1-mousePos.x) * 0.5),
            transition: 'right 2.5s cubic-bezier(0.2, 0.8, 0.2, 1), bottom 2.5s cubic-bezier(0.2, 0.8, 0.2, 1)' 
          }}
        />
        
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] bg-cyan-500/5"
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror"
          }}
          style={{ 
            left: '30%', 
            top: '60%' 
          }}
        />
      </motion.div>
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 xl:px-16 relative z-10">
        <Navbar />
        
        {/* Particle effect overlay */}
        {showParticles && (
          <div className="absolute inset-0 z-5 opacity-30 pointer-events-none">
            <div className="particles-container">
              {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="particle"
                  initial={{ 
                    x: Math.random() * 100 + "vw", 
                    y: Math.random() * 100 + "vh",
                    scale: Math.random() * 0.5 + 0.5 
                  }}
                  animate={{ 
                    y: [null, Math.random() * 100 + "vh"],
                    opacity: [0.1, Math.random() * 0.5 + 0.3, 0.1],
                  }}
                  transition={{ 
                    duration: Math.random() * 20 + 20, 
                    repeat: Infinity,
                    ease: "linear" 
                  }}
                  style={{
                    width: Math.random() * 3 + 1 + "px",
                    height: Math.random() * 3 + 1 + "px",
                    background: `rgba(255, 255, 227, ${Math.random() * 0.3 + 0.1})`,
                    boxShadow: `0 0 ${Math.random() * 3 + 2}px rgba(255, 255, 227, 0.3)`
                  }}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Static grid points - more subtle */}
        <div className="absolute inset-0 z-10 opacity-30">
          {gridPoints.map((point) => (
            <div
              key={point.id}
              className="absolute rounded-full bg-[#FFFFE3]"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                width: `2px`,
                height: `2px`,
                opacity: 0.1,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>

        <motion.div 
          className="flex items-center justify-center min-h-screen relative z-20"
          style={{ opacity }}
        >
          <div className="w-full max-w-[1600px] mx-auto">
            {/* Animated title with staggered reveal */}
            <div className="text-center">
              <motion.div 
                className="flex flex-wrap justify-center perspective-1000"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <AnimatePresence>
                  {words.map((word, i) => (
                    <motion.span
                      key={i}
                      className="text-[6vw] md:text-[5vw] lg:text-[4.5vw] font-clash leading-[1.1] font-bold text-[#FFFFE3] mx-2 inline-block"
                      initial={{ 
                        opacity: 0, 
                        y: 100,
                        rotateX: 30,
                        scale: 0.8
                      }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        rotateX: 0,
                        scale: 1
                      }}
                      transition={{ 
                        duration: 0.7, 
                        delay: i * 0.1,
                        ease: [0.215, 0.61, 0.355, 1] // Cubic bezier for bouncy effect
                      }}
                      whileHover={{ 
                        scale: 1.05, 
                        color: '#FFFFE3', 
                        textShadow: "0 0 15px rgba(255, 255, 227, 0.8)",
                        transition: { duration: 0.2 }
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </motion.div>
              
              {/* Animated subtitle - more subtle */}
              <motion.p
                className="text-[#FFFFE3] font-clash font-light opacity-5 mt-6 text-xl md:text-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: words.length * 0.1 + 0.5 }}
              >
                We don't do lectures. We do late-night builds
              </motion.p>
              
              {/* Enhanced animated button with glow effect */}
              <motion.button
                className="relative mt-9 bg-transparent border border-[#FFFFE3]/20 text-[#FFFFE3] px-8 py-3 rounded-full font-bold text-lg overflow-hidden group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 10, 
                  delay: words.length * 0.1 + 1 
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(255, 255, 227, 0.3)",
                  border: "1px solid rgba(255, 255, 227, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-[#FFFFE3]/0 via-[#FFFFE3]/10 to-[#FFFFE3]/0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
                <span className="relative z-10">Join Us</span>
                <motion.div 
                  className="absolute inset-0 -z-10 opacity-0 bg-[#FFFFE3]/10 rounded-full"
                  whileHover={{ 
                    opacity: 1,
                    scale: 1.1
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex flex-col items-center justify-center pb-24"
          style={{ y: textY }}
        >
          <motion.h1 
            className='text-[#FFFFE3] text-2xl md:text-3xl lg:text-4xl font-bold max-w-[1200px] mx-auto text-center'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            A bi-weekly, overnight hackathon where curious minds build cool, chaotic projects, learn by doing, and vibe with the community.
          </motion.h1>
        </motion.div>
      </div>
      
      {/* Add CSS for the special effects */}
      <style jsx="true">{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .grid-pattern {
          background-image: linear-gradient(rgba(255, 255, 227, 0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 227, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: grid-move 100s linear infinite;
        }
        
        .aurora-beam {
          position: absolute;
          height: 100%;
          width: 30px;
          filter: blur(30px);
          opacity: 0.5;
          background: linear-gradient(to bottom, rgba(0, 183, 255, 0.15), rgba(139, 0, 255, 0.05));
          transform: skew(20deg);
          animation: aurora 15s linear infinite;
        }
        
        .aurora-1 {
          left: 20%;
          animation-delay: 0s;
        }
        
        .aurora-2 {
          left: 50%;
          animation-delay: 5s;
          background: linear-gradient(to bottom, rgba(139, 0, 255, 0.15), rgba(0, 183, 255, 0.05));
        }
        
        .aurora-3 {
          left: 80%;
          animation-delay: 10s;
          background: linear-gradient(to bottom, rgba(0, 255, 179, 0.15), rgba(179, 0, 255, 0.05));
        }
        
        .particles-container {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .particle {
          position: absolute;
          border-radius: 50%;
        }
        
        @keyframes grid-move {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(40px);
          }
        }
        
        @keyframes aurora {
          0% {
            transform: skew(20deg) translateX(-100px);
          }
          100% {
            transform: skew(20deg) translateX(100px);
          }
        }
        
        @keyframes bg-gradient-radial {
          from {
            background-position: 0% 0%;
          }
          to {
            background-position: 100% 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default Home
