import React,{useContext} from 'react'
import './Polo.css'
import ProductItem from '../../Components/ProductItem/ProductItem'
import { ProductContext } from '../../Context/ProductContext'

const Polo = () => {
    const { productList } = useContext(ProductContext)
    console.log(productList)
    return (
        <div className='polo'>
            <h4>Áo polo</h4>
            <div className="polo-list">
                {productList.filter(item => item.category === 'polo').map((item, index) => (
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

export default Polo