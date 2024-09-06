import React, { useContext, useState } from 'react';
import lo_go from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.png';
import cart_icon from '../../assets/cart_icon.png';
import user_icon from '../../assets/user_icon.png';
import profile_success from '../../assets/profile_success.png';
import logout_icon from '../../assets/logout_icon.png';
import bag_icon from '../../assets/bag_icon.png';
import menu_icon from '../../assets/menu.png'; 
import close_icon from '../../assets/close.png'; 
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../Context/ProductContext';

const Navbar = ({ setShowlogin }) => {
  const { setToken, token, calculateTotalQuantity } = useContext(ProductContext);
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem('userId');
    setToken("");
    navigate("/");
  };

  const totalQuantity = calculateTotalQuantity();
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchKeyword}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='navbar'>
      <div className="navbar-top">
        <div className="navbar-top-image">
          <Link to='/'><img src={lo_go} alt="Logo" /></Link>
        </div>
        <div className={`navbar-top-center ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <Link to="/"><li>TRANG CHỦ</li></Link>
            <Link to="/policy"><li>CHÍNH SÁCH ĐỔI TRẢ</li></Link>
            <Link to="/size"><li>BẢNG SIZE</li></Link>
          </ul>
        </div>
        <div className="navbar-top-right">
          <form onSubmit={handleSearch}>
            <input 
              type="text" 
              value={searchKeyword} 
              onChange={(e) => setSearchKeyword(e.target.value)} 
              placeholder="Tìm kiếm sản phẩm..." 
            />
            <button type="submit"><img src={search_icon} alt="Search Icon" /></button>
          </form>
          <div className="navbar-top-right-cart">
            <Link to='/cart'>
              <img src={cart_icon} alt="Cart Icon" />
              {totalQuantity > 0 && <div className='cart-quantity'>{totalQuantity}</div>}
            </Link>
          </div>

          {!token ? 
            <img onClick={() => setShowlogin(true)} src={user_icon} alt="User Icon" /> :
            <div className="navbar-profile">
              <img src={profile_success} alt="Profile Success Icon" />
              <ul className='navbar-profile-dropdown'>
                <li onClick={() => navigate('/myorders')}>
                  <img src={bag_icon} alt="Bag Icon" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={logout_icon} alt="Logout Icon" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          }
          <img 
            className='navbar-menu-icon' 
            onClick={toggleMenu} 
            src={isMenuOpen ? close_icon : menu_icon} 
            alt="Menu Icon" 
          />
        </div>
      </div>
      <hr />
      <div className={`navbar-bot ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <Link to='/all'><li>Tất cả sản phẩm</li></Link>
          <Link to='/tshirt'><li>Áo Thun</li></Link>
          <Link to='/babytee'><li>Baby Tee</li></Link>
          <Link to='/polo'><li>Áo polo</li></Link>
          <Link to='/shirt'><li>Áo sơ mi</li></Link>
          <Link to='/jacket'><li>Áo khoác</li></Link>
          <Link to='/hoodie'><li>Hoodie</li></Link>
          <Link to='/pants'><li>Quần</li></Link>
          <li>Quần nữ</li>
          <li>Phụ kiện</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
