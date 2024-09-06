import React, { useContext } from 'react'
import './Tshirt.css'
import ProductItem from '../../Components/ProductItem/ProductItem'
import { ProductContext } from '../../Context/ProductContext'

const Tshirt = () => {
  const { productList } = useContext(ProductContext)
  console.log(productList)
  return (
    <div className='tshirt'>
      <h4>Áo thun</h4>
      <div className="tshirt-list">
        {productList.filter(item => item.category === 't-shirt').map((item, index) => (
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

export default Tshirt