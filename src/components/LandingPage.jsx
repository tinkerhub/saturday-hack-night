import React from 'react'
import "../css/LandingPage.css"
import bottomStar from "/public/assets/images/bottomBarStar.png"
import landingPageMainImage from "/public/assets/images/landingPageMainImage.png"
import landingPageLogo from "/public/assets/images/landing_page_logo.png"
import ribbon from "/public/assets/images/ribbon.svg"
import code_snippet from "/public/assets/images/code_snippet.svg"

import code_editor_file from "/public/assets/images/code_editor_file.png"
import code_editor_search from "/public/assets/images/code_editor_search.png"
import code_editor_git from "/public/assets/images/code_editor_git.png"
import code_edtir_profile from "/public/assets/images/code_editor_profile.png"



import Navbar from './Navbar'
import Timer from './Timer'

export default function LandingPage() {``
  return (
    <div className='landing_page'>

      <div className="navbarSection">
        <Navbar/>
      </div>

      <div className="gradient"></div>
      <div className="landingPageMainImage"><div className="gradient"></div><img src={landingPageMainImage.src} alt="image" /></div>


      <div className="landingPageLeftSection">

        <span className="wholeText">

          <span className="topText" >Improve Your</span> 
          <span className='bottomText'> skills by  <img src={landingPageLogo.src} alt="image" /></span>
          <span className = "bottomText2">Learn By Making Projects</span>

        </span>



        <div className="landing_page_timer">

          {/* <Timer/> */}
        </div>

      </div>

      <div className="landingPageRightSection">




        {/* <img src={code_snippet} alt="" className='landing_page_code_snippet' /> */}
        <div className='landing_page_code_snippet'>

              <div className="code_snippet_sidebar">

                <div className="top_icons">

                  <img src={code_editor_file.src} alt="" />
                  <img src={code_editor_search.src} alt="" />
                  <img src={code_editor_git.src} alt="" />

                </div>

                <div className="bottom_icon">
                  <img src={code_edtir_profile.src} alt="" />
                </div>

              </div>
              <div className="code_snipppet_code">

                <span className = "import">import random</span>
                <span className = "code_lines">def hacknight_hype():</span>
                <span className = "code_lines">phrases = [&ldquo;Hacking starts NOW!&ldquo;, &ldquo;Unleash Your inner coder&ldquo;, &ldquo;Code like a boss,party like a rockstar&ldquo;,&ldquo;Ready to conquer the digital world?&ldquo;]</span>
                <span className="code_func_call">hacknight_hype()</span>

              </div>

        </div>


        <div className="code_snippet">
          <img src={ribbon.src} alt="" className='landing_page_ribbon' />
        </div>





      </div>

      <div className="bottomBar">

        <ul>
          <li>START SHIPPING IDEAS<img src={bottomStar.src} alt="" /></li>
          <li>OPEN TO BEGINEERS<img src={bottomStar.srcr} alt="" /></li>
          <li>START SHIPPING IDEAS<img src={bottomStar.src} alt="" /></li>
          <li>THIS IS YOUR WEEKEND PLAN<img src={bottomStar.src} alt="" /></li>
          <li>START SHIPPING IDEAS<img src={bottomStar.src} alt="" /></li>
          <li>OPEN TO BEGINEERS<img src={bottomStar.src} alt="" /></li>
          <li>START SHIPPING IDEAS<img src={bottomStar.src} alt="" /></li>
          <li>THIS IS YOUR WEEKEND PLAN<img src={bottomStar.src} alt="" /></li>

        </ul>

      </div>

    </div>
  )
}
