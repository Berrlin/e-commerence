import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Order.css';

const Order = ({ url }) => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState(''); // State for status filter

    const fetchAllOrder = async () => {
        const response = await axios.get(url + "/api/order/list");
        if (response.data.success) {
            setOrders(response.data.data);
        } else {
            alert("Lỗi Fetch Admin");
        }
    };

    const statusHandler = async (event, orderId) => {
        const response = await axios.post(url + "/api/order/status", {
            orderId,
            status: event.target.value
        });
        if (response.data.success) {
            await fetchAllOrder();
        }
    };

    const getBackgroundColor = (status) => {
        switch (status) {
            case 'Đang xử lí':
                return 'yellow';
            case 'Đang vận chuyển':
                return 'orange';
            case 'Đã hoàn thành':
                return 'lightgreen';
            default:
                return 'white';
        }
    };

    const filteredOrders = orders.filter(order => {
        if (!order.payment) return false;
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = (
            order.userId.toLowerCase().includes(searchLower) ||
            order.address.name.toLowerCase().includes(searchLower) ||
            order.address.address.toLowerCase().includes(searchLower) ||
            order.address.phone.toLowerCase().includes(searchLower) ||
            order.items.some(item => item.name.toLowerCase().includes(searchLower))
        );

        const matchesStatus = filterStatus === '' || order.status === filterStatus;
        
        return matchesSearch && matchesStatus;
    });
    console.log(filteredOrders)

    useEffect(() => {
        fetchAllOrder();
    }, []);

    return (
        <div className='order'>
            <h3>Order Page</h3>
            <div className="order-filters">
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="order-search"
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="order-status-filter"
                >
                    <option value="">Tất cả trạng thái</option>
                    <option value="Đang xử lí">Đang xử lí</option>
                    <option value="Đang vận chuyển">Đang vận chuyển</option>
                    <option value="Đã hoàn thành">Đã hoàn thành</option>
                </select>
            </div>
            <div className="order-list">
                {filteredOrders.map((order, index) => (
                    <div key={index} className="order-item">
                        <div>
                            <div className="order-item-imgage">
                                {order.items.map((item, index) => (
                                    <div className='orderitem' key={index}>
                                        <div className="order-item-userid">
                                            <p>UserId: {order.userId}</p>
                                            <p>Tên: {order.address.name}</p>
                                            <p>Địa chỉ: {order.address.address}</p>
                                        </div>
                                        <div className='orderitem-detail'>
                                            <img src={`${url}/images/${item.imagemain}`} alt="" />
                                            <div>
                                                <p>{item.name}</p>
                                                <p>Số lượng: {item.quantity}</p>
                                                <p>Size: {item.size}</p>
                                                <p>Số điện thoại: {order.address.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="orderitem-amount">
                            <p className='amount'>{order.amount}.000 VNĐ</p>
                        </div>
                        <select
                            onChange={(event) => {
                                statusHandler(event, order._id);
                                event.target.style.backgroundColor = getBackgroundColor(event.target.value);
                            }}
                            value={order.status}
                            style={{ backgroundColor: getBackgroundColor(order.status) }}
                        >
                            <option value="Đang xử lí">Đang xử lí</option>
                            <option value="Đang vận chuyển">Đang vận chuyển</option>
                            <option value="Đã hoàn thành">Đã hoàn thành</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Order;
