"use client"

import React from 'react'
import step1 from "/public/assets/images/step1.svg"
import step2 from "/public/assets/images/step2.svg"
import step3 from "/public/assets/images/step3.svg"
import { useState, useEffect } from 'react'
import "../css/RegistrationSteps.css"

import step1_vertical from "/public/assets/images/card1_vertical.svg"
import step2_vertical from "/public/assets/images/card2_vertical.svg"
import step3_vertical from "/public/assets/images/card3_vertical.svg"

export default function RegistrationSteps() {


    var scrollValue = 0;

    const scrollAmount = 30;

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0)


    var regStepsFixed = false;

    useEffect(() => {

        setHeight(window.innerHeight)
        console.log("initial values are")
        console.log(window.innerHeight, window.innerWidth)
        setWidth(window.innerWidth)

    }, [])

    const [currentStep, setCurrentStep] = useState(0);
    useEffect(() => {
        let height = window.innerHeight;
        let width = window.innerWidth;



        // document.addEventListener("scroll", handleScroll )

        const handleWheel = (event) => {

            let height = window.innerHeight;
            let width = window.innerWidth;


            // console.log("scrolling");

            let stepBox = document.getElementsByClassName("stepTiles")[0];
            let divLine1 = document.getElementById("divLineInner1");
            let divLine2 = document.getElementById("divLineInner2");

            let box = document.getElementsByClassName("registrationSteps")[0];
            let offsets = stepBox.getBoundingClientRect();
            let x = Math.abs(parseInt((offsets.top + offsets.height) / 2) - parseInt(window.innerHeight / 2));

            let windowCenter = parseInt(window.innerHeight / 2)
            let distanceFromTop = parseInt((offsets.top + offsets.height) / 2)
            // console.log(windowCenter, distanceFromTop, scrollValue)

            if (regStepsFixed) {

                if (height / width <= 1) {
                    // console.log("here")
                    let scrollTopValue = document.getElementsByClassName("registrationContainer")[0].getBoundingClientRect().top + window.scrollY
                    // window.scrollTop = scrollTopValue
                    if (document.body.style.overflowX == "scroll") {
                        window.scrollTo({
                            top: scrollTopValue,

                        })
                    }

                    // console.log("scroll top value is",scrollTopValue,"scroll value is", window.scrollY)  
                    document.body.style.overflowY = "hidden";
                    document.body.style.overflowX = "scroll"
                }

                // console.log(currentStep);
            } else {
                document.body.style.overflowY = "scroll"
                document.body.style.overflowX = "scroll"
            }


            if (distanceFromTop <= windowCenter && scrollValue == 0) {
                regStepsFixed = true
            } else if (distanceFromTop > windowCenter && scrollValue == 2 * scrollAmount) {
                regStepsFixed = true
            }

            if (regStepsFixed) {
                if (event.deltaY > 0) {
                    scrollValue += 1;
                } else {
                    scrollValue -= 1;
                }
            }



            if (scrollValue < 0) {
                scrollValue = 0;
                regStepsFixed = false
                // document.body.style.overflowY = "scroll"

                // document.body.style.overflowX = "scroll"
            }
            if (scrollValue >= 2 * scrollAmount) {
                scrollValue = 2 * scrollAmount
                regStepsFixed = false
                document.body.style.overflowY = "scroll"
                // document.body.style.overflowX = "scroll"

            }

            // console.log(height , width)
            if ((height / width <= 1)) {

                if (scrollValue <= (3 * scrollAmount) / 2) {

                    divLine1.style.width = `${((scrollValue) / ((2 * scrollAmount) / 2)) * 100}%`

                } else {
                    // divLine2.style.width = `${((scrollValue - (2 * scrollAmount) / 2) / ((2 * scrollAmount) / 2)) * 100}%`
                    divLine2.style.width = `${parseInt(((scrollValue - scrollAmount) / scrollAmount) * 100)}%`

                }
            }

            // console.log(`${((scrollValue - (2 * scrollAmount) / 2) / ((2 * scrollAmount) / 2)) * 100}%`)
            console.log(scrollValue, `${parseInt(((scrollValue - scrollAmount) / scrollAmount) * 100)}%`)


            console.log(scrollValue, currentStep, regStepsFixed)
            if (scrollValue % scrollAmount == 0 && scrollValue <= scrollAmount * 2) {
                // console.log(stepBox)
                // console.log(`-${parseInt(scrollValue / scrollAmount) * 100}vw`);
                // stepBox.style.marginLeft = `-${parseInt(scrollValue / scrollAmount) * 100}vw`;
                // console.log(currentStep)
                console.log("chanding current step")
                if (currentStep < 2) {
                    setCurrentStep(currentStep + 1)
                    console.log("chanding current step")
                } else {
                    setCurrentStep(0);
                }
                // console.log("its", `-${parseInt(scrollValue / scrollAmount) * 100}vw`);
            }

        }

        document.addEventListener("wheel", handleWheel )

        return () => {
            document.removeEventListener("wheel", handleWheel);
            // document.removeEventListener("scroll", handleScroll);
          };
      

    }, [])



    // console.log("its ", window.innerHeight / window.innerWidth)
    return (
        <div className="registrationContainer">
            {/* fafasd */}
            <div className='registrationSteps'>

                <div className='circular_blur_reg_steps'></div>

                <h3 className="registrationStepsHeading">Register now for the <span>Online Hacknights</span></h3>

                <div className="stepsBox">

                    <div className="steps_order">
                        <button className='stepsBoxstep' onClick={() => { setCurrentStep(0) }} style={{ opacity: (currentStep == 0) ? "1" : "0.5" }}>REGISTER</button>
                        <span className="divisionLine"> <span className='divisionLineInner' id="divLineInner1"></span> </span>
                        <button className='stepsBoxstep' onClick={() => { setCurrentStep(1) }} style={{ opacity: (currentStep == 1) ? "1" : "0.5" }} >EXPLORE</button>
                        <span className="divisionLine">  <span className='divisionLineInner' id='divLineInner2'></span> </span>
                        <button className='stepsBoxstep' onClick={() => { setCurrentStep(2) }} style={{ opacity: (currentStep == 2) ? "1" : "0.5" }} >BUILD</button>
                    </div>

                    <div className="stepDetails">


                        {/* { 

                        <div className="singleStep" style={{ display: (currentStep == 0 || window.innerHeight/window.innerWidth > 1) ? "flex" : "none" }}>
                            <img src={(window.innerHeight/window.innerWidth > 1)? step1_vertical : step1} alt="" />
                        </div>
                    }
                    {

                        <div className="singleStep" style={{ display: (currentStep == 1 || window.innerHeight/window.innerWidth > 1) ? "flex" : "none" }}>
                             <img src={(window.innerHeight/window.innerWidth > 1)? step2_vertical : step2} alt="" />
                        </div>

                    }
                    {

                        <div className="singleStep" style={{ display: (currentStep == 2 || window.innerHeight/window.innerWidth > 1) ? "flex" : "none" }}>
                           <img src={(window.innerHeight/window.innerWidth > 1)? step3_vertical : step3} alt="" />
                        </div>
                    } */}

                        <div className="stepTiles" style={{ marginLeft: `-${currentStep * 100}vw` }}>

                            {

                                <div className="singleStep">
                                    <img src={(height / width > 1) ? step1_vertical.src : step1.src} alt="" />
                                </div>
                            }
                            {

                                <div className="singleStep">
                                    <img src={(height / width > 1) ? step2_vertical.src : step2.src} alt="" />
                                </div>

                            }
                            {

                                <div className="singleStep" >
                                    <img src={(height / width > 1) ? step3_vertical.src : step3.src} alt="" />
                                </div>
                            }
                        </div>

                    </div>

                </div>

                <div className="stepBoxVertical">
                    <div className="singleStepVertical">
                        <h3>REGISTER</h3>
                        <img src={step1_vertical.src} alt="" />
                    </div>
                    <div className="singleStepVertical">
                        <h3>EXPLORE</h3>
                        <img src={step2_vertical.src} alt="" />
                    </div>
                    <div className="singleStepVertical">
                        <h3>BUILD</h3>
                        <img src={step3_vertical.src} alt="" />
                    </div>


                </div>

            </div>
        </div>
    )
}
