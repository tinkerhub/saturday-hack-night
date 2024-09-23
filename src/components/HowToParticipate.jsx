import React from 'react'
import "../css/HowToParticipate.css"
import image from "/public/assets/images/howToParticipate.png"
import Image from 'next/image'

export default function HowToParticipate() {
  return (
    <div className='howToParticipate'>

      <h3 className='howToParticipateHeading'>How To Participate ?</h3>
      <div className='howToParticipateImageAndText'>

        <div className='howToParticipateImageSection' >
          <Image src={image} alt="" />
          {/* <div className = "yellowDiv"></div> */}
          <p>Shn is a recurring event that happens once in every 3 months. </p>
        </div>

        <div className="howToParticipateTextSection">
          <p>All you’ve got to do is participate for any of the online hack nights happening on <b> first and third week </b>every month to grab tickets for SHN held at Tinkerspace :)</p>
          <span>and that’s it, see you there!</span>
        </div>
        </div>

    </div>
  )
}
