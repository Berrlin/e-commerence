import React, { useContext } from 'react';
import { ProductContext } from '../../Context/ProductContext';
import './Cart.css';
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom';
import empty_cart from '../../assets/cart_icon.png'
const Cart = () => {
  const { cartItems, loading, error, url, increaseCartQuantity, decreaseCartQuantity, clearCart, removeFromCart } = useContext(ProductContext);

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (error) {
    return <div className="error">Lỗi: {error}</div>;
  }

  if (Object.keys(cartItems).length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-content">
          <img src={empty_cart}alt="Empty Cart" className="empty-cart-image" />
          <h2>Giỏ hàng của bạn đang trống</h2>
          <p>Không sao cả! Hãy khám phá các sản phẩm tuyệt vời của chúng tôi.</p>
          <Link to="/all" className="view-products-link">
            Xem tất cả sản phẩm
          </Link>
        </div>
      </div>
    );
  }
  
  

  const calculateTotalAmount = () => {
    return Object.values(cartItems).reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const totalAmount = calculateTotalAmount();

  return (
    <div>
      <div className="cart">
        <div className="cart-title">
          <ul>
            <li>Thông tin sản phẩm</li>
            <li>Đơn giá</li>
            <li>Số lượng</li>
            <li>Thành tiền</li>
          </ul>
        </div>
        <div className="cart-list">
          {Object.keys(cartItems).map((key) => {
            const item = cartItems[key];
            const imageUrl = `${url}/images/${item.imagemain}`;
            const itemTotal = item.price * item.quantity;

            return (
              <div className="cart-item" key={key}>
                <div className="cart-list-info">
                  <img src={imageUrl} alt={item.name} className="cart-item-image" />
                  <div className="cart-list-info-more">
                    <p>{item.name}</p>
                    <p>{item.color} / {item.size}</p>
                    <p onClick={() => removeFromCart(item.id, item.color, item.size)}>Xoá</p>
                  </div>
                </div>
                <div className="cart-list-price">
                  <p>{item.price}.000d</p>
                </div>
                <div className="cart-list-quantity">
                  <button
                    className="quantity-btn"
                    onClick={() => decreaseCartQuantity(item.id, item.color, item.size)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => increaseCartQuantity(item.id, item.color, item.size)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-list-total">
                  <p> {itemTotal}.000d</p>
                </div>
              </div>

            )
          })}
        </div>

      </div>
      <div className="cart-total">
        <div className="cart-total-left">
          <button onClick={clearCart}>XOÁ TẤT CẢ</button>
        </div>
        <div className="cart-total-right">
          <div className="cart-total-right-p">
            <p>Tổng tiền: </p>
            <p>{totalAmount}.000đ</p>
          </div>
          <div className="cart-total-right-button">
            <Link to='/checkout'><button>THANH TOÁN</button></Link>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Cart;
