import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import letxploreImg from '../assets/images/letxplore.jpg'
import shnImg from '../assets/images/SHN.jpg'
import Carousel from '../components/Carousel'
import LoopText from '../components/LoopText'
import Register from '../components/Register'

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
        {/* Gradient background with enhanced colors */}
              <div className="absolute inset-0 bg-[#0A0A0F]"></div>
              <div className="absolute inset-0 bg-gradient-radial from-blue-900/25 via-indigo-900/15 to-[#0A0A0F]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-purple-900/15 to-[#0A0A0F]"></div>
        <div className="absolute inset-0 bg-[#0A0A0F]" style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 0.2]) }}></div>
        
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

        {/* Register Section */}
        <div className="relative z-10 w-full">
          <Register />
        </div>

        <motion.div
          className="max-w-4xl mx-auto px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-5xl md:text-6xl font-clash font-bold text-[#FFFFE3] mb-4">
            Join LetXplore
          </h2>
          <p className="text-xl md:text-2xl font-clash font-light text-[#FFFFE3]/60 mb-3 max-w-2xl ">
            Your techy pregame before Saturday HackNight — where learning meets creation
          </p>
          
        </motion.div>
                  
        <motion.div 
          className="flex flex-col md:flex-row flex-wrap justify-center gap-8 mx-auto my-4 p-8 md:p-10 rounded-2xl backdrop-blur-sm bg-[#0A0A0F]/40   shadow-[0_10px_50px_-12px_rgba(0,0,0,0.7)] relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Subtle background glow */}
          <div className="absolute w-full h-full z-0 overflow-visible">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFFFE3]/5 rounded-full blur-[80px] mix-blend-screen"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFFFE3]/5 rounded-full blur-[60px] mix-blend-screen animate-pulse-slow"></div>
          </div>
          
          <div className="absolute inset-0 bg-[#0A0A0F]/30 z-0"></div>
          
          <motion.div
            className="relative group overflow-hidden rounded-xl bg-[#0A0A0F]/90 border border-[#FFFFE3]/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ 
              scale: 1.02, 
              boxShadow: "0 20px 40px -12px rgba(255, 255, 227, 0.1)",
              borderColor: "rgba(255, 255, 227, 0.2)"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tl from-[#FFFFE3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out mix-blend-overlay"></div>
            <div className="relative w-[320px] h-[220px] overflow-hidden rounded-t-xl group-hover:shadow-inner group-hover:shadow-[#FFFFE3]/5">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFFFE3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-color-burn"></div>
              <img 
                className="absolute w-full h-full object-cover object-[center_30%] transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"  
                src={letxploreImg} 
                alt="Let Explore" 
              />
            </div>
            <div className="absolute bottom-0 left-0 w-full p-4 bg-[#0A0A0F]/70 border-t border-[#FFFFE3]/10">
              <h3 className="text-[#FFFFE3] font-clash text-lg font-medium tracking-wide">Let Explore</h3>
              <p className="text-[#FFFFE3]/60 text-sm mt-1 font-light">Interactive learning experience</p>
              <div className="flex items-center mt-2">
                <svg className="w-4 h-4 text-[#FFFFE3]/60 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <p className="text-[#FFFFE3]/60 text-xs font-medium">Friday, 8:00 PM</p>
              </div>
            </div>
            <motion.div 
              className="absolute top-0 left-0 w-full h-[1px] bg-[#FFFFE3]/20" 
              initial={{ scaleX: 0, originX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
          
          <motion.div
            className="relative group overflow-hidden rounded-xl bg-[#0A0A0F]/90 border border-[#FFFFE3]/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            whileHover={{ 
              scale: 1.02, 
              boxShadow: "0 20px 40px -12px rgba(255, 255, 227, 0.1)",
              borderColor: "rgba(255, 255, 227, 0.2)"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tl from-[#FFFFE3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out mix-blend-overlay"></div>
            <div className="relative w-[320px] h-[220px] overflow-hidden rounded-t-xl group-hover:shadow-inner group-hover:shadow-[#FFFFE3]/5">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFFFE3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-color-burn"></div>
              <img 
                className="absolute w-full h-full object-cover object-[center_30%] transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"  
                src={shnImg} 
                alt="Saturday Hack Night" 
              />
            </div>
            <div className="absolute bottom-0 left-0 w-full p-4 bg-[#0A0A0F]/70 border-t border-[#FFFFE3]/10">
              <h3 className="text-[#FFFFE3] font-clash text-lg font-medium tracking-wide">Saturday Hack Night</h3>
              <p className="text-[#FFFFE3]/60 text-sm mt-1 font-light">Building projects that matter</p>
              <div className="flex items-center mt-2">
                <svg className="w-4 h-4 text-[#FFFFE3]/60 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <p className="text-[#FFFFE3]/60 text-xs font-medium">Saturday, 6:00 PM - 10:00 PM</p>
              </div>
            </div>
            <motion.div 
              className="absolute top-0 left-0 w-full h-[1px] bg-[#FFFFE3]/20" 
              initial={{ scaleX: 0, originX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </motion.div>
       
        {/* Benefits Section */}
        <motion.div 
          className="max-w-6xl mx-auto my-20 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
         
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <motion.div 
              className="bg-[#0A0A0F]/70 backdrop-blur-sm p-6 rounded-xl border border-[#FFFFE3]/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -12px rgba(255, 255, 227, 0.1)" }}
            >
              <div className="w-12 h-12 bg-[#FFFFE3]/5 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#FFFFE3]/60" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-clash font-medium text-[#FFFFE3] mb-2">Hands-on Learning</h3>
              <p className="text-[#FFFFE3]/60 mb-4">Dive into practical coding sessions that prepare you for real-world challenges.</p>
            </motion.div>
            
            {/* Benefit 2 */}
            <motion.div 
              className="bg-[#0A0A0F]/70 backdrop-blur-sm p-6 rounded-xl border border-[#FFFFE3]/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -12px rgba(255, 255, 227, 0.1)" }}
            >
              <div className="w-12 h-12 bg-[#FFFFE3]/5 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#FFFFE3]/60" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h3 className="text-xl font-clash font-medium text-[#FFFFE3] mb-2">Community Network</h3>
              <p className="text-[#FFFFE3]/60 mb-4">Connect with passionate developers and build lasting professional relationships.</p>
            </motion.div>
            
            {/* Benefit 3 */}
            <motion.div 
              className="bg-[#0A0A0F]/70 backdrop-blur-sm p-6 rounded-xl border border-[#FFFFE3]/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -12px rgba(255, 255, 227, 0.1)" }}
            >
              <div className="w-12 h-12 bg-[#FFFFE3]/5 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#FFFFE3]/60" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-clash font-medium text-[#FFFFE3] mb-2">Project Portfolio</h3>
              <p className="text-[#FFFFE3]/60 mb-4">Build impressive projects that showcase your skills to potential employers.</p>
            </motion.div>
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.button
              className="px-8 py-3 bg-[#FFFFE3]/10 text-[#FFFFE3] rounded-full font-clash font-medium text-lg relative overflow-hidden group border border-[#FFFFE3]/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Register Now</span>
              <div className="absolute inset-0 bg-[#FFFFE3]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </motion.div>
        </motion.div>
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
