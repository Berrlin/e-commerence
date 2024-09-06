import React,{useContext} from 'react'
import './Jacket.css'
import ProductItem from '../../Components/ProductItem/ProductItem'
import { ProductContext } from '../../Context/ProductContext'

const Jacket = () => {
    const { productList } = useContext(ProductContext)
    console.log(productList)
    return (
        <div className='jacket'>
            <h4>Baby Tee</h4>
            <div className="jacket-list">
                {productList.filter(item => item.category === 'jacket').map((item, index) => (
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

export default Jacket