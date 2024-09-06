import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './User.css'; // Import CSS file

const User = ({ url }) => {
  const [list, setList] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const fetchListUser = async () => {
    try {
      const response = await axios.get(`${url}/api/user/list`);
      setList(response.data.data);
    } catch (error) {
      console.error("API fetch error:", error);
      alert("Lỗi khi lấy danh sách người dùng");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(`${url}/api/user/delete`, { id });
      toast.success("User deleted successfully");
      fetchListUser(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user. Please try again.");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: '', // Reset password field
    });
    setErrors({}); // Clear any existing errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let newErrors = { ...errors };
    if (name === 'password' && value.length > 0 && value.length < 5) {
      newErrors.password = 'Mật khẩu phải có ít nhất 5 ký tự.';
    } else {
      newErrors.password = '';
    }

    if (name === 'phone') {
      if (value.length < 10 || value.length > 11) {
        newErrors.phone = 'Số điện thoại phải có từ 10 đến 11 ký tự.';
      } else {
        newErrors.phone = '';
      }
    }

    setErrors(newErrors);
  };

  const handleUpdate = async () => {
    if (errors.password || errors.phone) {
      toast.error(errors.password || errors.phone);
      return;
    }

    try {
      await axios.put(`${url}/api/user/update`, { id: editingUser, ...formData });
      toast.success("User updated successfully");
      fetchListUser(); 
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user. Please try again.");
    }
  };

  useEffect(() => {
    fetchListUser();
  }, [url]);

  return (
    <div className="user-container">
      {list.length > 0 ? (
        list.map((e) => (
          <div key={e._id} className="user-card">
            <p>Id: {e._id}</p>
            <p>Mail: {e.email}</p>
            <p>Tên: {e.name}</p>
            <p>Số điện thoại: {e.phone}</p>
            <div className="button-top">
              <button onClick={() => handleEdit(e)}>Cập Nhập</button>
              <button onClick={() => handleDelete(e._id)} className="delete-btn">Xóa</button>
            </div>

            {editingUser === e._id && (
              <div className="edit-form">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tên"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Số điện thoại"
                />
                {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mật khẩu mới (để trống nếu không thay đổi)"
                />
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                <div className="button-bottom">
                  <button onClick={handleUpdate}>Lưu</button>
                  <button onClick={() => setEditingUser(null)} className="cancel-button">Hủy</button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Không có người dùng nào</p>
      )}
    </div>
  );
};

export default User;
