import React from 'react'
import "./slider.scss"
const Slider = () => {
  return (
    <div className='slider'>
      <div className="videoContainer">
      <video 
      src='./img/trailer.mp4'
      autoPlay
      loop
      muted
      controls={false}
      /> 
      </div>
     
      
    </div>
  )
}

export default Slider
