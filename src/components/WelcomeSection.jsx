import React from 'react'
import "../css/WelcomeSection.css"
import offline_hacknight_image from "/public/assets/images/offline_shn_photo.png"
import shn_logo from "/public/assets/images/shn_logo.png"

import Image from 'next/image'

export default function WelcomeSection() {
    return (
        <div className="welcome_section">

            <div className="circular_blur2"></div>

            <div className="welcome_section_main">

                <h1 className="welcome_section_heading">You&lsquo;re Welcome Here</h1>

                <div className="welcome_image_and_text">

                    <div className="welcome_image_card">
                        <div className="welcome_image">
                            <Image src={offline_hacknight_image} alt="image" />
                        </div>
                        <h3>But hey, it&apos;s more than just an offline hackathon : )</h3>
                    </div>
                    <div className="welcome_text_section">
                        <div className="circular_blur"></div>
                        <div className="welcome_text">
                            <Image src={shn_logo} alt="" />
                            <p>Come together, build your ideas, and explore new APIs and frameworks during our exclusive Saturday HackNights.</p>
                        </div>
                    </div>


                </div>
            </div>





        </div>
    )
}
