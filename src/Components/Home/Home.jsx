import React from 'react'
import Hero from './Hero'
import Arrivals from './Arrivals'
import Top from './Top'
import Style from './Style'
import Category from './Category'
import Reviews from './Reviews'
import Collections from "./Collections"
import Benefits from "../Benefits/Benefits"
const Home = () => {
  return <>

  <Hero/>
  <Collections/>
  <Arrivals/>
  {/* <Top/>
  <Style/>
  <Category/> */}
  <Reviews/>
  <Benefits/>
  </>
}

export default Home