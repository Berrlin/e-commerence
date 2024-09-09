import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
export const ProductContext = createContext(null);

const ProductContextProvider = (props) => {
  const url = 'https://e-commerence-backend.onrender.com';
  const [productList, setProductList] = useState([]);
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addToCart = async (cartItem) => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage hoặc context
    const userId = localStorage.getItem('userId');
    if (!userId || !token) {
      console.error("User ID hoặc token bị thiếu");
      setError("User ID hoặc token bị thiếu");
      return;
    }

    const { id, color, size, quantity, price, imagemain, name } = cartItem;
    const key = `${id}-${color}-${size}`;
    console.log('Add to Cart - itemId:', id);
    setCartItems(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        quantity: (prev[key]?.quantity || 0) + quantity,
        id,
        color,
        size,
        price,
        imagemain,
        name,
      }
    }));

    try {
      const response = await axios.post(
        `${url}/api/cart/add`,
        { userId, itemId: id, color, size, quantity, price, imagemain, name, id },
        { headers: { token } }
      );

      console.log("Cart item:", cartItem);

      console.log('Server response:', response.data);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng", error.response ? error.response.data : error.message);
      setError("Không thể thêm sản phẩm vào giỏ hàng");
    }

  };


  const loadCartData = async () => {
    console.log("Current Token:", token);
    console.log("Current UserID:", userId);
    if (!token || !userId) {
      console.error("User ID hoặc token bị thiếu");
      setError("User ID hoặc token bị thiếu");
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/cart/get`,
        { userId },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData || {});
        console.log("Cart data loaded:", response.data.cartData);
      } else {
        console.error("Server response:", response.data);
        setError(response.data.message || "Không thể tải dữ liệu giỏ hàng");
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu giỏ hàng", error.response || error);
      setError("Không thể tải dữ liệu giỏ hàng");
    }
  };

  // ----------------TIM KIEM------------------------
  const searchProducts = (query) => {
    return productList.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  };
  

  // ----------------GIAM SO LUONG------------------------
  const decreaseCartQuantity = async (itemId, color, size) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/decrease`,
        { userId, itemId, color, size },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems(prevCart => {
          const key = `${itemId}-${color}-${size}`;
          const updatedCart = { ...prevCart };

          if (updatedCart[key]) {
            if (updatedCart[key].quantity > 1) {
              updatedCart[key].quantity -= 1;
            } else {
              delete updatedCart[key];
            }
          }

          return updatedCart;
        });
      } else {
        setError(response.data.message || "Không thể giảm số lượng sản phẩm");
      }
    } catch (error) {
      console.error("Lỗi khi giảm số lượng sản phẩm", error.response || error);
      setError("Không thể giảm số lượng sản phẩm");
    }
  };

  // ----------------TANG SO LUONG------------------------
  const increaseCartQuantity = async (itemId, color, size) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/increase`,
        { userId, itemId, color, size },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems(prevCart => {
          const key = `${itemId}-${color}-${size}`;
          const updatedCart = { ...prevCart };

          if (updatedCart[key]) {
            updatedCart[key].quantity += 1;
          }

          return updatedCart;
        });
      } else {
        setError(response.data.message || "Không thể tăng số lượng sản phẩm");
      }
    } catch (error) {
      console.error("Lỗi khi tăng số lượng sản phẩm", error.response || error);
      setError("Không thể tăng số lượng sản phẩm");
    }
  };

  // ----------------DELETE ONE PRODUCTID --------------------
  const removeFromCart = async (itemId, color, size) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/remove`, // Đảm bảo đường dẫn đúng với route đã định nghĩa
        { userId, itemId, color, size },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems(prevCart => {
          const key = `${itemId}-${color}-${size}`;
          const updatedCart = { ...prevCart };
          delete updatedCart[key];
          return updatedCart;
        });
        toast.success("Xoá thành công")
      } else {
        setError(response.data.message || "Không thể xóa sản phẩm");
      }
    } catch (error) {
      toast.error("Lỗi khi xóa sản phẩm", error.response || error);
      setError("Không thể xóa sản phẩm");
    }
  };


  // ----------------DELETE ALL --------------------
  const clearCart = async () => {
    setCartItems({});

    try {
      await axios.post(
        `${url}/api/cart/clear`,
        { userId },
        { headers: { token } }
      );
      toast.success("Xoá toàn bộ thành công")
    } catch (error) {
      toast.error("Không thể xóa sản phẩm khỏi giỏ hàng");
    }
  };

  // ----------------CALCULATE TOTAL --------------------
  const calculateTotal = () => {
    return Object.values(cartItems).reduce((total, item) => total + item.quantity * item.price, 0);
  };

  // ----------------CALCULATE TOTAL QUANTITY --------------------
  const calculateTotalQuantity = () => {
    return Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
  };



  const fetchListProduct = async () => {
    try {
      const response = await axios.get(`${url}/api/product/list`);
      setProductList(response.data.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm:', error);
      setError("Không thể lấy danh sách sản phẩm");
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUserId) {
      setUserId(storedUserId);
    }

    fetchListProduct();
  }, []);


  useEffect(() => {
    async function loadData() {
      if (!token || !userId) {
        setLoading(false);
        return;
      }
      await fetchListProduct();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"))
      }
    }
    loadData();
  }, [token, userId]);




  const contextValue = {
    url,
    productList,
    cartItems,
    token,
    userId,
    searchProducts,
    setToken,
    setUserId,
    addToCart,
    loadCartData,
    calculateTotalQuantity,
    setCartItems,
    increaseCartQuantity,
    clearCart,
    decreaseCartQuantity,
    removeFromCart,
    calculateTotal,
    loading,
    error,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
