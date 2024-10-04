import React from 'react'
import "./home.scss"
import Slider from '../../Components/Slider/Slider'
import Features from '../../Components/Features/Features'
import Categories from '../../Components/Categories/Categories'
import Solde from '../Solde/Solde'
import Collection from '../Collection/Collection'

const Home = () => {
  return (
    <div className='home'>
<Slider/>
<Categories/>
<Collection/>
<Features/>
<Solde/>


    </div>
  )
}

export default Home
