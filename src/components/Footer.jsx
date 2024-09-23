import React from 'react'

import shh_logo from "/public/assets/images/shn_logo.png"
import tinkerhub_logo from "/public/assets/images/tinkerhub_logo.svg"
import tinkerhub_org_logo from "/public/assets/images/tinkerhub_org_logo.svg"

import "../css/Footer.css"


export default function Footer() {
  return (
    <div className='footer' >

        <div className="left">

            <img src={shh_logo.src} alt="" />

        </div>
        <div className="right">

            <img src={tinkerhub_logo.src} alt="" />
            <img src={tinkerhub_org_logo.src} alt="" />

        </div>
      
    </div>
  )
}
