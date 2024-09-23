import React from 'react'
import image from "/public/assets/images/bottomImage.svg"
import "../css/BottomImage.css"
import Image from 'next/image'

export default function BottomImage() {
  return (
    <div className='bottomImage'>

        <Image src={image} alt="" />
      
    </div>
  )
}
