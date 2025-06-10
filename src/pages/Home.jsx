import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import LoopText from '../components/Looptext'
import Register from '../components/Register'
import DisplayCards from "../components/Displaycards"
import Testimonials from "../components/Testimonials";
import Stats from "../components/Stats";
import Timer from "../components/Timer";
import FAQ from '../components/FAQ';
import Partners from '../components/Partners';


const Home = () => {
  const containerRef = useRef(null)
  const [gridPoints, setGridPoints] = useState([])
  const { scrollYProgress } = useScroll()
  const [showParticles, setShowParticles] = useState(false)
  


  // Parallax effect values
  // Reduced parallax for smoother experience
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

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
    
    // Show particles after initial load for better performance
    const timer = setTimeout(() => {
      setShowParticles(true)
    }, 500)
    
    return () => {
      clearTimeout(timer)
    }
  }, [])

  // Text animation setup
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const typewriterText = "Recurring hackathon\nto build\nbreak\nand learn\nby doing"
  const lines = typewriterText.split("\n")
  
  // For staggered word animation (unused but kept for reference)
  const text = "Recurring hackathon to build break and learn by doing"
  const words = text.split(" ")
  
  // Start typewriter animation on mount
  useEffect(() => {
    let timeout
    
    // Type current line character by character
    const typeLine = async (line) => {
      setIsTyping(true)
      for (let i = 0; i <= line.length; i++) {
        await new Promise(resolve => {
          timeout = setTimeout(() => {
            setCurrentText(line.substring(0, i))
            resolve()
          }, 100)
        })
      }
      
      // Pause at the end of typing
      await new Promise(resolve => {
        timeout = setTimeout(resolve, 800)
      })
    }
    
    // Backspace the current line character by character
    const backspaceLine = async (line) => {
      setIsTyping(false)
      for (let i = line.length; i >= 0; i--) {
        await new Promise(resolve => {
          timeout = setTimeout(() => {
            setCurrentText(line.substring(0, i))
            resolve()
          }, 50) // Faster deletion
        })
      }
      
      // Short pause after deletion
      await new Promise(resolve => {
        timeout = setTimeout(resolve, 300)
      })
    }
    
    const runTypewriter = async () => {
      // Loop indefinitely through all lines
      while (true) {
        for (let i = 0; i < lines.length; i++) {
          await typeLine(lines[i])
          
          // Don't backspace the final line on the last iteration
          if (i < lines.length - 1) {
            await backspaceLine(lines[i])
          } else {
            // Pause longer on the final line before restarting
            await new Promise(resolve => {
              timeout = setTimeout(resolve, 3000)
            })
            await backspaceLine(lines[i])
          }
        }
      }
    }
    
    runTypewriter()
    
    // Cleanup
    return () => clearTimeout(timeout)
  }, [])

;

  return (
    <div 
      ref={containerRef} 
      className="bg-[#0A0A0F] mx-auto min-h-screen relative overflow-hidden perspective-1000"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      <Navbar />
      
      

      {/* Enhanced background effect with depth */}
      <motion.div 
          className="absolute inset-0 z-0" 
          style={{ y: bgY, backgroundColor: "#0A0A0F" }}
        >
        {/* Timer */}
        <Timer />

        {/* Gradient background with enhanced colors */}
              <div className="absolute inset-0 bg-[#0A0A0F]"></div>
              <div className="absolute inset-0 bg-gradient-radial from-blue-900/25 via-indigo-900/15 to-[#0A0A0F]"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-purple-900/15 to-[#0A0A0F]"></div>
              <div className="absolute inset-0 bg-[#0A0A0F]" style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 0.2]) }}></div>
        
        {/* Animated neon grid lines */}
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        
        {/* FAQ Section */}
        <motion.div transition={{ duration: 2 }}>
          <div className="aurora-beam aurora-1"></div>
          <div className="aurora-beam aurora-2"></div>
          <div className="aurora-beam aurora-3"></div>
        </motion.div>
        
        {/* Static background elements */}
        <motion.div 
          className="absolute w-[800px] h-[800px] rounded-full blur-[150px] bg-blue-500/25"
          animate={{
            scale: [0.9, 1.05, 0.95, 0.9],
            opacity: [0.25, 0.35, 0.25, 0.25]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
          style={{ 
            left: '30%',
            top: '40%',
            zIndex: 5,
            mixBlendMode: "lighten"
          }}
        />
        
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] bg-purple-500/20"
          animate={{
            scale: [1, 0.9, 1.1, 1],
            opacity: [0.2, 0.3, 0.2, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
          style={{ 
            right: '30%',
            bottom: '40%',
            zIndex: 5,
            mixBlendMode: "lighten"
          }}
        />
      </motion.div>
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 xl:px-16 relative z-10">
        <motion.div 
          className="flex items-center justify-center min-h-screen relative z-20"
        >
          <div className="w-full max-w-[1600px] mx-auto">
            {/* Animated title with staggered reveal */}
            <div className="text-center">
              {/* Typewriter Effect */}
              <motion.div 
                className="flex flex-col items-center justify-center text-[#FFFFE3] mx-auto w-full max-w-5xl h-[180px]"
                animate={{ 
                  y: currentText.length === 0 ? -10 : 0,
                  opacity: currentText.length === 0 ? 0.8 : 1
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30 
                }}
              >
                <motion.h2 
                  className={`text-[7vw] md:text-[6vw] lg:text-[5vw] font-clash font-bold mb-[-1vw] leading-[1.2] text-center w-full ${isTyping ? 'cursor' : ''}`}
                  initial={{ opacity: 1 }}
                  style={{
                    fontFamily: "monospace",
                    WebkitTextStroke: "1px rgba(255, 255, 227, 0.2)",
                    textShadow: "0 0 10px rgba(255, 255, 227, 0.3)"
                  }}
                >{currentText}</motion.h2>
              </motion.div>
              
              {/* Original staggered animation - now hidden, just for mobile backup */}
              <motion.div 
                className="hidden flex-wrap justify-center perspective-1000"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
              >
                <AnimatePresence>
                  {words.map((word, i) => (
                    <motion.span
                      key={i}
                      className="text-[6vw] md:text-[5vw] lg:text-[4.5vw] font-clash leading-[1.1] font-bold text-[#FFFFE3] mx-2 inline-block"
                    >
                      {word}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </motion.div>
              
              {/* Animated subtitle - more subtle */}
              <div className="fixed-subtitle-container">
                <motion.p
                  className="text-[#FFFFE3] font-clash font-light text-xl md:text-2xl opacity-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: words.length * 0.1 + 0.5 }}
                >
                  We don't do lectures. We do late-night builds
                </motion.p>
              </div>
              
              {/* Enhanced animated button with glow effect */}
              <motion.button
                className="relative mt-4 bg-transparent border border-[#FFFFE3]/20 text-[#FFFFE3] px-8 py-3 rounded-full font-bold text-lg overflow-hidden group"
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
                <span className="relative z-10 font-clash font-medium">Join Us</span>
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

        {/* Carousel showcase - moved here after landing section */}
        <div className="relative z-20 w-full h-screen">
          <Carousel />
        </div>

        <div className="flex w-full h-80 justify-center">
          <div className="relative w-full max-w-4xl mx-auto px-4">
            <LoopText interval={3}>
              <span className="text-6xl font-clash font-medium">
                <span className="text-white">Wanna Join </span> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Saturday HackNight?</span>
              </span>
              <span className="text-6xl font-clash font-medium">
                <span className="text-white">But Saturday HackNight is </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Invite Only</span>
              </span>
              <span className="text-6xl font-clash font-medium">
                <span className="text-white">Join the </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500">online edition </span>
                <span className="text-white">for Invite</span>
              </span>
            </LoopText>
          </div>
        </div>

        <div className="relative z-10 w-full h-screen translate-y-1/4 ">
          <DisplayCards />
        </div>

        <div className="relative z-10 w-full">
          <Register />
        </div>
        
        <div className="relative z-10 py-24">
          <Stats />
        </div>

        <Testimonials />
      </div>

        {/* Partners Section */}
        <div className="relative z-10 w-full py-24">
          <Partners />
        </div>

      {/* FAQ Section */}
      <div className="relative z-10 w-full">
          <FAQ />
        </div>

     

      
      {/* Add CSS for the special effects */}
      <style jsx="true">{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .cursor::after {
          content: '|';
          margin-left: 4px;
          animation: blink 1s infinite;
          display: inline-block;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(0.95); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        
        .fixed-subtitle-container {
          height: 10px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 30;
         margin-bottom: 30px;
        }
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
