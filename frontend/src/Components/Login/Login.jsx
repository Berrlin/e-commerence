import React, { useContext, useState, useEffect } from 'react';
import './Login.css';
import { ProductContext } from '../../Context/ProductContext';
import cross_icon from '../../assets/cross_icon.png';
import axios from 'axios';

const Login = ({ setShowLogin }) => {
  const { url, setToken, setUserId, token } = useContext(ProductContext);
  const [currState, setCurrState] = useState("Login");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  // Check token and userId on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, [setToken, setUserId]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        setUserId(response.data.userId); // Assuming the userId is returned from the API
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login/Register error:", error);
    }
    setLoading(false);
  };


  return (
    <div className='login'>
      <form onSubmit={onLogin} className='login-container'>
        <div className="login-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={cross_icon} alt="Close" />
        </div>
        <div className="login-input">
          {currState === 'Login' ? null :
            <div className='login-input-content'>
              <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your Name' required />
              <input type="number" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Your Phone Number' required maxLength={11} minLength={9} />
            </div>}
          <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Your Email' required />
          <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Enter Password' required />
        </div>
        {/* <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button> */}
        <button type='submit' disabled={loading}>
          {loading ? "Đang xử lý..." : (currState === "Sign Up" ? "Create Account" : "Login")}
        </button>

        <div className="login-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currState === "Login" ?
          <p>Create New Account <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
          :
          <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login</span></p>}
      </form>
    </div>
  );
};

export default Login;
