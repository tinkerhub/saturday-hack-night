import React from 'react'
import "../css/Testimonials.css"

import Carousal from './Carousal'

export default function Testimonials() {
    return (
        <div className='testimonialsSection'>

            <h3 className="testimonialsHeading">Celebrating <span>Code and Community</span></h3>
            <Carousal direction={1} position = {0} />
            <Carousal direction={-1} position = {1} />

        </div>
    )
}
