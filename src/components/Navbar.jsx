import React from 'react'
import "../css/Navbar.css"
import shn_logo from "/public/assets/images/shn_navbar_logo.png"
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className="navbar">
    <a href="/"><img src={shn_logo.src} alt="" className="hacknightLogo" /></a>
    
    <span>ABOUT</span>
    <a href = "/events"><span>PROJECT HUB</span></a>
    
    <span className='loginButton'>LOGIN</span>
  </div>
   
   
  )
}
