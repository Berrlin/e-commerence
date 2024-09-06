import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './NavigationBar.css'

const NavigationBar = () => {
  const location = useLocation(); // Hook để lấy đường dẫn hiện tại

  return (
    <div className='navigationbar'>
      <ul>
        <li className={location.pathname === '/add' ? 'active' : ''}>
          <Link to='/add'>THÊM SẢN PHẨM</Link>
        </li>
        <li className={location.pathname === '/list' ? 'active' : ''}>
          <Link to='/list'>TẤT CẢ SẢN PHẨM</Link>
        </li>
        <li className={location.pathname === '/order' ? 'active' : ''}>
          <Link to='/order'>ĐƠN HÀNG</Link>
        </li>
        <li className={location.pathname === '/user' ? 'active' : ''}>
          <Link to='/user'>NGƯỜI DÙNG</Link>
        </li>
      </ul>
    </div>
  )
}

export default NavigationBar
