import React from 'react'
import Banner from '../../Components/Banner/Banner'
import HomeProduct from '../../Components/HomeProduct/HomeProduct'
import More from '../../Components/More/More'

const Home = () => {
  return (
    <div>
        <Banner/>
        <HomeProduct/>
        <hr />
        <More/>
    </div>
  )
}

export default Home