import './App.css'
import Navbar from './components/Navbar/Navbar'
import NavigationBar from './components/NavigationBar/NavigationBar'
import { ToastContainer, toast } from 'react-toastify';
import { Routes, Route } from 'react-router-dom'
import Add from './page/Add/Add';
import List from './page/List/List';
import 'react-toastify/dist/ReactToastify.css';
import Update from './page/Update/Update';
import Order from './page/Order/Order';
import User from './page/User/User';
const App = () => {
  const url = "http://localhost:4000"

  return (
    <div className="app">
      <ToastContainer />
      <Navbar />
      <div className="app-content">
        <NavigationBar />
        <Routes>
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} />} />
          <Route path="/update" element={<Update url={url} />} />
          <Route path='/order' element={<Order url={url}/>}/>
          <Route path='/user' element={<User url={url}/>}/>
        </Routes>
      </div>

    </div>
  )
}

export default App
