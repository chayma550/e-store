import React from 'react'
import "./about.scss"
import Offers from '../../Components/Offers/Offers'
const About = () => {
  return (
    <div className='about'>
        <div className="top">
        <h1>About</h1>
      <hr/>
      <p className='bg'>Proin eu ante vel mauris molestie dignissim non eget nunc.</p>
      <p className='sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu ante vel mauris molestie dignissim non eget nunc. Integer ac massa orci. Suspendisse vulputate semper nunc eget rhoncus. Ut sit amet porta sem, interdum tincidunt libero. Nulla vel quam lobortis, varius est scelerisque, dapibus nisl.</p>
        </div>
        <section className="bg_parallax_scroll">
      <div className="details">
      <span className='sm'>The Mission </span>
      <h1>At the heart of everything, we set out to offer the best quality.</h1>
      <span className='bg'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu ante vel mauris</span>
      </div>
      
    </section>
    <div className="bottom">
    <h1>How it Started</h1>
      <hr/>
      <p className='sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>  
      <div className="about-container">
        <div className="aboutInfo">
            <h1>Vel mauris molestie dignissim</h1>
            <p>Praesent vel faucibus ligula. Sed sit amet ipsum eget velit aliquet faucibus. Maecenas et odio id turpis sollicitudin pulvinar sit amet vitae augue. Phasellus nec ultricies arcu. Quisque efficitur tellus sit amet bibendum molestie. Duis id egestas odio. Phasellus lacinia ex quis faucibus tempor. Sed feugia.</p>
        </div>
       
      </div>
      <Offers/>
    
    </div>
    </div>
  )
}

export default About
