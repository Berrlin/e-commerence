import React from 'react'
import under0 from '../../assets/under0.png'
import under1 from '../../assets/under1.png'
import under2 from '../../assets/under2.png'
import under3 from '../../assets/under3.png'
import under4 from '../../assets/under4.png'
import under5 from '../../assets/under5.png'
import under6 from '../../assets/under6.png'
import under7 from '../../assets/under7.png'
import './More.css'
const More = () => {
  const ScrollToTop = ()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <div className='more'>
        <p>Find out TEELAB more</p>
        <div className="more-imagelist">
            <img onClick={ScrollToTop} src={under0} alt="" />
            <img onClick={ScrollToTop} src={under1} alt="" />
            <img onClick={ScrollToTop} src={under2} alt="" />
            <img onClick={ScrollToTop} src={under3} alt="" />
            <img onClick={ScrollToTop} src={under4} alt="" />
            <img onClick={ScrollToTop} src={under5} alt="" />
            <img onClick={ScrollToTop} src={under6} alt="" />
            <img onClick={ScrollToTop} src={under7} alt="" />
        </div>
    </div>
  )
}

export default More