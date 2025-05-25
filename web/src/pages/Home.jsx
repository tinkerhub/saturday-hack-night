import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

const Home = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const [gridPoints, setGridPoints] = useState([])
  const cursorRef = useRef(null)
  const [clientMousePosition, setClientMousePosition] = useState({ x: 0, y: 0 })
  const [customCursorEnabled, setCustomCursorEnabled] = useState(true)

  // Generate grid points
  useEffect(() => {
    const generateGrid = () => {
      const points = []
      const cols = 20
      const rows = 15
      
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

    // Toggle custom cursor with Escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setCustomCursorEnabled(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Store raw client mouse position for cursor
      setClientMousePosition({ x: e.clientX, y: e.clientY })
      
      if (containerRef.current) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect()
        
        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height
        
        setMousePosition({ x, y })
        
        // Update highlighted points
        const updatedPoints = gridPoints.map(point => {
          const distance = Math.sqrt(
            Math.pow((point.x / 100) - x, 2) + 
            Math.pow((point.y / 100) - y, 2)
          )
          
          const highlighted = distance < 0.15
          const sizeMultiplier = highlighted ? (1 - distance * 5) : 1
          const opacityMultiplier = highlighted ? (1 - distance * 4) : 1
          
          return {
            ...point,
            highlighted,
            size: 4 * sizeMultiplier,
            opacity: 0.15 * opacityMultiplier
          }
        })
        
        setGridPoints(updatedPoints)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    setIsVisible(true)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [gridPoints])

  // Text animation
  const text = "Recurring hackathon to build, break, and learn by doing"
  const words = text.split(" ")

  return (
    <div 
      ref={containerRef} 
      className={`bg-[#10100E] mx-auto min-h-screen relative overflow-hidden `}
    >
      <Navbar />
      
      {/* Grid background */}
      <div className="absolute inset-0 z-10">
        {gridPoints.map((point) => (
          <motion.div
            key={point.id}
            className={`absolute rounded-full bg-[#FFFFE3] ${point.highlighted ? 'filter blur-[1px]' : ''}`}
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              width: `${point.size}px`,
              height: `${point.size}px`,
              opacity: point.opacity,
              transform: 'translate(-50%, -50%)',
              transition: 'width 0.3s ease, height 0.3s ease, opacity 0.3s ease'
            }}
          />
        ))}
        
        {/* Grid connections */}
        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          {gridPoints.filter(p => p.highlighted).map((point) => {
            const nearbyPoints = gridPoints.filter(p => {
              if (!p.highlighted || p.id === point.id) return false
              
              const distance = Math.sqrt(
                Math.pow((p.x - point.x) / 100, 2) + 
                Math.pow((p.y - point.y) / 100, 2)
              )
              
              return distance < 0.08 // Only connect nearby highlighted points
            })
            
            return nearbyPoints.map(nearby => (
              <motion.line
                key={`${point.id}-${nearby.id}`}
                x1={`${point.x}%`}
                y1={`${point.y}%`}
                x2={`${nearby.x}%`}
                y2={`${nearby.y}%`}
                stroke="#FFFFE3"
                strokeOpacity={0.2}
                strokeWidth="1"
              />
            ))
          })}
        </svg>
      </div>

      {/* Mouse cursor effects */}
      <motion.div 
        className="absolute w-[100px] h-[100px] rounded-full pointer-events-none z-20"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,227,0.1) 0%, rgba(255,255,227,0) 70%)',
          left: `calc(${mousePosition.x * 100}% - 50px)`,
          top: `calc(${mousePosition.y * 100}% - 50px)`,
          transition: 'left 0.1s ease-out, top 0.1s ease-out'
        }}
      />
      
      {/* Custom cursor - only shown if enabled */}
      

      <div className="flex items-center justify-center h-screen pt-16 relative z-20">
        <div className="max-w-8xl px-4">
          {/* Animated title */}
          <div className="text-center">
            <div className="flex flex-wrap justify-center">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  className="text-[80px] font-clash leading-[1.1] font-bold text-[#FFFFE3] mx-2 inline-block"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: i * 0.1,
                    ease: "easeOut" 
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    color: '#FFFFE3', 
                    textShadow: "0 0 8px rgba(255, 255, 227, 0.8)" 
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            
            {/* Animated subtitle */}
            <motion.p
              className="text-[#FFFFE3] opacity-80 mt-6 text-xl"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: words.length * 0.1 + 0.5 }}
            >
              We don’t do lectures. We do late-night builds
            </motion.p>
            
            {/* Animated button with enhanced hover effect */}
            <motion.button
              className="relative mt-9 bg-[#FFFFE3] text-[#10100E] px-8 py-3 rounded-full font-bold text-lg overflow-hidden group"
              initial={{ scale: 0 }}
              animate={isVisible ? { scale: 1 } : {}}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 10, 
                delay: words.length * 0.1 + 1 
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-[#FFFFE3]/0 via-[#FFFFE3]/30 to-[#FFFFE3]/0"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              Join Us
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
