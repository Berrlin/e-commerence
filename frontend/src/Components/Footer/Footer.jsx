import React from 'react'
import './Footer.css'
import logo_footer from '../../assets/logo_footer.png'
import logo_bct from '../../assets/logo_bct.png'
import facebook from '../../assets/facebook.png'
import instagram from '../../assets/instagram.png'
import tiktok from '../../assets/tiktok.png'
import shopee from '../../assets/shopeeicon.png'
import lazada from '../../assets/lazadaicon.png'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="footer-container">
                <div className="footer-logo">
                    <img src={logo_footer} alt="Teelab Logo" />
                    <p>HKD Mai Quốc Tuấn</p>
                    <ul className='footer-contact'>
                        <li>Địa chỉ: Số 235, Đường Quang Trung, Tổ 7, Phường Tân Thịnh, Thành phố Thái Nguyên, Tỉnh Thái Nguyên, Việt Nam</li>
                        <li>Email: teelabvn@gmail.com</li>
                        <li>Điện thoại: 0865539083</li>
                    </ul>
                    <img src={logo_bct} alt="BCT Logo" />
                </div>  
                <div className="footer-links">
                    <h1>About Us</h1>
                    <ul>
                        <li>Trang chủ</li>
                        <li>Tất cả sản phẩm</li>
                        <li>Bảng Size</li>
                        <li>Kiểm tra đơn hàng</li>
                        <li>Hệ Thống Cửa Hàng</li>
                    </ul>
                </div>
                <div className="footer-links">
                    <h1>Chính Sách</h1>
                    <ul>
                        <li>Chính sách mua hàng</li>
                        <li>Chính sách bảo mật</li>
                        <li>Phương thức thanh toán</li>
                        <li>Chính sách giao nhận, vận chuyển</li>
                        <li>Chính sách đổi trả</li>
                    </ul>
                </div>
                <div className="footer-social">
                    <p>Theo dõi Teelab từ các nền tảng khác nhau nhé!</p>
                    <div className="social-icons">
                        <img src={facebook} alt="Facebook" />
                        <img src={instagram} alt="Instagram" />
                        <img src={tiktok} alt="TikTok" />
                        <img src={shopee} alt="Shopee" />
                        <img src={lazada} alt="Lazada" />
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Teelab. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
