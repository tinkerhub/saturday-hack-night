import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import TechStackScroll from '../components/TechStackScroll'
import FeatureAccordion from '../components/FeatureAccordion';
import Testimonials from "../components/Testimonials";
import ScrollRevealText from "../components/ScrollRevealText";
import Stats from "../components/Stats";
import FAQ from '../components/FAQ';
import Partners from '../components/Partners';
import Footer from '../components/Footer';


const Home = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll()

  // Parallax effect values
  // Reduced parallax for smoother experience
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  


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
          style={{ y: bgY }}
        >
        {/* Gradient background with enhanced colors */}
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
          className="absolute w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] rounded-full blur-[100px] sm:blur-[120px] md:blur-[150px] bg-blue-500/25"
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
            left: '20%',
            top: '40%',
            zIndex: 5,
            mixBlendMode: "lighten"
          }}
        />
        
        <motion.div 
          className="absolute w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] bg-purple-500/20"
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
            right: '20%',
            bottom: '40%',
            zIndex: 5,
            mixBlendMode: "lighten"
          }}
        />
      </motion.div>
      
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
        <motion.div 
          className="flex flex-col justify-center min-h-[70vh] relative z-20"
        >
          {/* Carousel showcase - moved here after landing section */}
          <div className="relative z-20 w-full flex justify-center mt-36">
            <Carousel />
          </div>
        </motion.div>

        <div className="text-center text-[#FFFFE3] font-clash font-medium text-3xl md:w-3/4 justify-center mx-auto sm:text-xl md:text-2xl mt-20 lg:text-3xl ">
          Saturday HackNight: a biweekly hackathon to explore tech, build fun projects, and grow together.
        </div>
        <div className='mt-20 mb-20'> 
        <TechStackScroll />
        </div>
        

        <div className="relative z-10">
          <FeatureAccordion />
        </div>

        <div className="relative z-10 pt-20 ml-10">
          <p className="relative text-left text-3xl w-3/4 sm:text-4xl md:text-5xl text-[#FFFFE3] font-clash font-medium mb-2 pt-32">
            <span className="absolute top-24 md:-top-4 md:-left-8 text-gray-500 opacity-50 text-[9rem] md:text-[14rem]" >“</span>
            At HackNight, you find your flow, your people, and your confidence as a developer.
          </p>
          <div className="text-right -translate-x-14  text-[#FFFFE3] font-clash text-lg md:text-xl">
            <p className="font-medium">bla bla</p>
            <p className="text-sm opacity-80">Founder, Saturday HackNight</p>
          </div>
        </div>

       <ScrollRevealText></ScrollRevealText>
        
        <div className="relative z-10 py-12 sm:py-24 px-4">
          <Stats />
        </div>

        <div className="relative z-10 px-4">
          <Testimonials />
        </div>
      </div>

      <div className="relative z-10 h-[60vh] sm:h-screen max-w-7xl mx-auto px-4  flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.6 }}
          className="text-5xl sm:text-5xl md:text-5xl lg:text-7xl xl:text-9xl font-clash font-medium text-center sm:text-left leading-tight sm:leading-none"
        >
          We build, we learn. It's the maker mindset.
        </motion.h1>
      </div>

      {/* FAQ Section */}
      <div className="relative z-10 w-full px-4" id="faq-section">
          <FAQ />
        </div>

      {/* Footer Section */}
      <div className="relative z-10 w-full px-4">
        <Footer />
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
          margin-bottom: 20px;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .grid-pattern {
          background-image: linear-gradient(rgba(255, 255, 227, 0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 227, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
          animation: grid-move 100s linear infinite;
        }
        
        .aurora-beam {
          position: absolute;
          height: 100%;
          width: 20px;
          filter: blur(20px);
          opacity: 0.5;
          background: linear-gradient(to bottom, rgba(0, 183, 255, 0.15), rgba(139, 0, 255, 0.05));
          transform: skew(20deg);
          animation: aurora 15s linear infinite;
        }
        
        .aurora-1 {
          left: 10%;
          animation-delay: 0s;
        }
        
        .aurora-2 {
          left: 50%;
          animation-delay: 5s;
          background: linear-gradient(to bottom, rgba(139, 0, 255, 0.15), rgba(0, 183, 255, 0.05));
        }
        
        .aurora-3 {
          left: 90%;
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
            transform: translateY(20px);
          }
        }
        
        @keyframes aurora {
          0% {
            transform: skew(20deg) translateX(-50px);
          }
          100% {
            transform: skew(20deg) translateX(50px);
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

