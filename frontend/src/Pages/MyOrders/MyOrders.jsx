import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../Context/ProductContext';
import axios from 'axios';
import './MyOrders.css'; // Import CSS file

const MyOrders = () => {
    const { url, token } = useContext(ProductContext);
    const [data, setData] = useState([]);

    const fetchOrder = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            // Lọc đơn hàng có payment là true
            const filteredData = response.data.data.filter(order => order.payment === true);
            setData(filteredData);
            console.log(filteredData);
        } catch (error) {
            console.error("Lỗi khi tải đơn hàng:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrder();
        }
    }, [token]);

    return (
        <div className="my-orders">
            <h2>ĐƠN HÀNG CỦA TÔI</h2>
            <div className="container">
                {data.map((order, index) => {
                    const { date, items, status } = order;
                    return (
                        <div key={index} className="my-orders-order">
                            <p>Ngày đặt hàng: {new Date(date).toLocaleDateString()}</p>
                            <div className="item">
                                <div className="order-items">
                                    {items.map((item, i) => (
                                        <div key={i} className="order-item">
                                            <img src={`${url}/images/${item.imagemain}`} alt={item.name} className="order-item-image" />
                                            <div className="order-item-info">
                                                <p>{item.name}</p>
                                                <p>Màu sắc: {item.color}</p>
                                                <p>Kích cỡ: {item.size}</p>
                                                <p>Số lượng: {item.quantity} x {item.price}.000đ</p>
                                                <p className="order-total">Tổng tiền: {item.totalAmount}.000đ</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <span>Trạng thái: {status}</span>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );

};

export default MyOrders;
