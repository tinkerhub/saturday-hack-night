"use client"

import React, { useState, useEffect } from "react";

import "../css/Carousal.css"; // We'll define some CSS for styling

import testimonial1 from "/public/assets/images/group42.png"
import Image from "next/image";

// const images = [
  // "../assets/images/group42.png",
  // "../assets/images/group42.png",
  // "../assets/images/group42.png",
  // "../assets/images/group42.png",
  // "../assets/images/group42.png",
//  
// ];

const images = [
  testimonial1,testimonial1,testimonial1,testimonial1,testimonial1
]

const Carousal = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [ height , setHeight ] = useState(0);
  const [ width , setWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  })

  const getClassName = (index) => {

    let Class = ""

    if (index === currentIndex) {
      // return "carousel-image center";
      Class = "center"
    } else if (index === (currentIndex + 1) % images.length) {
      // return "carousel-image center-left";
      Class = "center-left"
    } else if (index === (currentIndex - 1 + images.length) % images.length) {
      // return "carousel-image left";
      Class  = "left"
    } else if (index === (currentIndex + 2) % images.length) {
      // return "carousel-image shadow-right";
      Class = "shadow-right"
    } else if (index === (currentIndex - 2 + images.length) % images.length) {
      // return "carousel-image shadow-left";
      Class = "shadow-left"
    }

  
    let Classname = "carousel-image";
    if ( Class != ""){
      Classname += ` ${Class}`
    }
    if(props.direction == -1 ){
      Classname +=`-anticlockwise`
    }

    // console.log(Classname)  


    return Classname;
  };

  return (
    <div className="testimonials">
    
    <div className="carousalContainer">
    <div className={`carousel ${(props.position == 0 )? 'upperCarousal':'' }`}
     style = {{marginLeft: (props.direction == 1 && height < width)?"-33vw":"0vw"}}
     >
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          // width={}
          
          alt={`Carousel ${index}`}
          className={`carousal_image ${getClassName(index)}`}
        />
      ))}
    </div>
    </div>
    </div>
  );
};

export default Carousal;
