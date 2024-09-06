import React, { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../../Context/ProductContext';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, url, removeFromCart, token, productList } = useContext(ProductContext);

  const [data, setData] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  const onChangeHandler = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))

  }

  const calculateTotalAmount = () => {
    const totalAmount = Object.values(cartItems).reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);


    const shippingFee = totalAmount < 500 ? 30 : 0;
    return {
      totalAmount,
      shippingFee,
      finalAmount: totalAmount + shippingFee,
    };
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = Object.keys(cartItems).map((itemId) => {
      const item = cartItems[itemId];
      const itemTotal = item.price * item.quantity;
      return {
        id: itemId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        imagemain: item.imagemain,
        totalAmount: itemTotal,
      };
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: calculateTotalAmount(),
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url, payment } = response.data;

        if (payment) {
          await updateProductQuantity(orderItems);
        }

        window.location.replace(session_url);
      } else {
        alert("Đặt hàng thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đặt hàng:", error);
      alert("Đã xảy ra lỗi khi đặt hàng");
    }
  };



  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/cart')
    } else if (calculateTotalAmount() === 0) {
      navigate('/cart')
    }
  }, [token])



  const { totalAmount, shippingFee, finalAmount } = calculateTotalAmount();

  return (
    <form onSubmit={placeOrder}>
      <div className='checkout'>
        <div className="checkout-left" >
          <h2>Người mua/nhận hàng</h2>
          <p>Tên</p>
          <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Tên người nhận' required />
          <p>Điện thoại liên lạc</p>
          <input name='phone' onChange={onChangeHandler} value={data.phone} type="number" placeholder='Số điện thoại' required />
          <p>Địa chỉ nhận hàng</p>
          <input name='address' onChange={onChangeHandler} value={data.address} type="text" placeholder='Địa chỉ nhận hàng' required />
          <p>Ghi chú</p>
          <textarea name="note" onChange={onChangeHandler} value={data.note} id="" rows={4}></textarea>
          <p className='total'>Tổng tiền sản phẩm: {totalAmount}.000đ</p>
          {shippingFee > 0 && <p className='shipping-fee'>Phí vận chuyển: {shippingFee}.000đ</p>}
          <p className='final-total'>Tổng tiền thanh toán: {finalAmount}.000đ</p>
          <button>ĐẶT HÀNG</button>
        </div>

        <div className='checkout-right'>
          <h2>Thông tin đơn hàng</h2>

          <div>
            {Object.keys(cartItems).map((key) => {
              const item = cartItems[key];
              const imageUrl = `${url}/images/${item.imagemain}`;
              const itemTotal = item.price * item.quantity;

              return (
                <div key={key}>
                  <div className="checkout-item">
                    <img src={imageUrl} alt={item.name} className="checkout-item-image" />
                    <div className="checkout-item-info">
                      <p>{item.name}</p>
                      <p>{item.color} / {item.size}</p>
                      <p>Số lượng: {item.quantity} x {item.price}.000đ  = {itemTotal}.000đ</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id, item.color, item.size)}>Xoá</button>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </form>

  );
};

export default Checkout;
