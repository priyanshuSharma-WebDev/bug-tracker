import React, { useState } from 'react'
import "./ToogleSwitch.css"
import { motion } from "framer-motion";

function ToogleSwitch({isOn, setIsOn}) {

  const toggleSwitch = () => setIsOn(!isOn);

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };

  return (
    <div className="switch w-48 h-16 bg-accentDarkBg flex justify-start rounded-2xl cursor-pointer" data-ison={isOn} onClick={toggleSwitch}>
      <motion.div className={`handle w-28 h-16 bg-mainButtonColor rounded-2xl relative ${isOn ? "before:content-['Threads']" : "before:content-['Projects']"} 
          before:absolute before:text-tiny before:top-1/2 before:left-1/2 before:text-mainBackgroundDarkColor before:transform before:-translate-x-1/2 before:-translate-y-1/2`} layout transition={spring} />
    </div>
  )
}

export default ToogleSwitch