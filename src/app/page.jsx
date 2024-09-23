import Image from "next/image";

import "./page.css"


import LandingPage from '../components/LandingPage'
import WelcomeSection from '../components/WelcomeSection'
import Testimonials from '../components/Testimonials'
import HowToParticipate from '../components/HowToParticipate'
import RegistrationSteps from '../components/RegistrationSteps'
import WhySaturdayHacknight from '../components/WhySaturdayHacknight'
import Navbar from "@/components/Navbar";
import Sponsers from '../components/Sponsers'
// import LandingPage from '../components/LandingPage'
import BottomImage from '../components/BottomImage'
import AboutCards from '../components/AboutCards'
// import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import Testimonials from '../components/Testimonials'

export default function Home() {
  return (

    <div>
      
      <LandingPage/>
      <AboutCards/>
      <WelcomeSection/>
      
      
      <Testimonials/>
      <HowToParticipate/>
      <RegistrationSteps/>  
      <WhySaturdayHacknight/>
      <Sponsers/>
      <BottomImage/>
      <Footer/>
    </div>

  );
}
