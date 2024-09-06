import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import profile from '../../assets/profile.png'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <div className="content">
                <h1>QUẢN LÝ CỬA HÀNG</h1>
            </div>
            <div className="profile">
                <img src={profile} alt="" />
            </div>

        </div>
    )
}

export default Navbar