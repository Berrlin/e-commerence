import React, { useContext } from 'react'
import './Shirt.css'
import ProductItem from '../../Components/ProductItem/ProductItem'
import { ProductContext } from '../../Context/ProductContext'

const Shirt = ({ category }) => {
  const { productList } = useContext(ProductContext)
  console.log(productList)
  return (
    <div className='shirt'>
      <h4>Áo Sơ Mi</h4>
      <div className="shirt-list">
        {productList.filter(item => item.category === 'shirt').map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            old_price={item.old_price}
            new_price={item.new_price}
            image={item.imagemain}
          />
        ))}

      </div>
    </div>
  )
}

export default Shirt