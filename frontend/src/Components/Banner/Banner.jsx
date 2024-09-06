import React from 'react'
import './Banner.css'
import banner1 from '../../assets/banner1.png'
import banner2 from '../../assets/banner2.png'
import banner3 from '../../assets/banner3.png'
import banner4 from '../../assets/banner4.png'
import banner5 from '../../assets/banner5.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        speed: 1000,
        autoSpeed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className='banner'>
            <div className="banner-slider">
                <Slider {...settings}>
                    <div>
                        <img src={banner1} alt="" />
                    </div>
                    <div>
                        <img src={banner2} alt="" />
                    </div>
                    <div>
                        <img src={banner3} alt="" />
                    </div>
                    <div>
                        <img src={banner4} alt="" />
                    </div>
                    <div>
                        <img src={banner5} alt="" />
                    </div>

                </Slider>

            </div>
            <div className="banner-content">
                <h1>Enjoy Your Youth!</h1>
                <p>Không chỉ là thời trang, TEELAB còn là “phòng thí nghiệm” của tuổi trẻ - nơi nghiên cứu và cho ra đời nguồn năng lượng mang tên “Youth”. Chúng mình luôn muốn tạo nên những trải nghiệm vui vẻ, năng động và trẻ trung.</p>
            </div>
        </div>
    )
}

export default Banner