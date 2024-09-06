import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ProductContextProvider from './Context/ProductContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ProductContextProvider>
      <App />
    </ProductContextProvider>,
  </BrowserRouter>

)
