import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home/Home'
import Policy from './Pages/Policy/Policy'
import Size from './Pages/Size/Size'
import Tshirt from './Pages/Tshirt/Tshirt'
import Babytee from './Pages/Babytee/Babytee'
import Login from './Components/Login/Login'
import Shirt from './Pages/Shirt/Shirt'
import Footer from './Components/Footer/Footer'
import ProductDetail from './Components/ProductDetail/ProductDetail'
import Cart from './Pages/Cart/Cart'
import Polo from './Pages/Polo/Polo'
import Checkout from './Pages/Checkout/Checkout'
import Verify from './Pages/Verify/Verify'
import MyOrders from './Pages/MyOrders/MyOrders'
import All from './Pages/All/All';
import SearchResults from './Components/SearchResult/SearchResult';
import Jacket from './Pages/Jacket/Jacket';
import Hoodie from './Pages/Hoodie/Hoodie';
import Paint from './Pages/Paint/Paint';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
      <ToastContainer />
        <Navbar setShowlogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/policy' element={<Policy />} />
          <Route path='/size' element={<Size />} />
          <Route path='/all' element={<All/>}/>
          <Route path='/tshirt' element={<Tshirt />} />
          <Route path='/babytee' element={<Babytee />} />
          <Route path='/polo' element={<Polo/>}/>
          <Route path='/shirt'element={<Shirt />} />
          <Route path='/jacket'element={<Jacket />} />
          <Route path='/hoodie'element={<Hoodie />} />
          <Route path='/pants'element={<Paint />} />
          <Route path="/:id"element={<ProductDetail />} />
          <Route path='/cart'element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/myorders' element={<MyOrders/>}/>
          <Route path="/search" element={<SearchResults />} />
        </Routes>

      </div>
      <Footer className="footer" />
    </>
  )
}

export default App
