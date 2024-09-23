import React from 'react'
import "../css/AboutCards.css"

import card1 from "/public/assets/images/card1.svg"
import card2 from "/public/assets/images/card2.svg"
import card3 from "/public/assets/images/card3.svg"

import Image from 'next/image'

export default function AboutCards() {
  return (
    <div className='aboutCards'>


        <div className="card">
          <div className="card_inner">
            
            <div className="front"> <img src={card1.src} alt="" /></div>
            <div className="back">
            <h3> We&lsquo;ve got you covered</h3>
              
            </div>
          </div>
           
        </div>
        <div className="card">
        <div className="card_inner">
            <div className="front"> <img src={card2.src} alt="" /></div>
            <div className="back">
            <h3> We&lsquo;ve got you covered</h3>
              
            </div>
          </div>
          
            
        </div>
        <div className="card">
        <div className="card_inner">
            <div className="front"> <img src={card3.src} alt="" /></div>
            <div className="back">

            <h3> We&lsquo;ve got you covered</h3>
           
            </div>
          </div>
        </div>
      
    </div>
  )
}
