import React from 'react'
import sponser1 from "/public/assets/images/sponser1.png"
import sponser2 from "/public/assets/images/sponser2.png"
import "../css/Sponsers.css"

import Image from 'next/image'

export default function Sponsers() {
  return (
    <div className='sponsers'>


        <div className="previousPartners">
            <h1>OUR PREVIOUS <span>PARTNERS</span></h1>
            <h3>Click Here to Know More About Sponsers</h3>
        </div>
        <div className="sponser_images">
            <Image className = "image2" src={sponser2} alt="" />
            <Image className = "image1" src={sponser1} alt="" />
        </div>
      
    </div>
  )
}
