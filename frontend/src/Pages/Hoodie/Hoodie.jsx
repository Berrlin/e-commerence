import React,{useContext} from 'react'
import './Hoodie.css'
import ProductItem from '../../Components/ProductItem/ProductItem'
import { ProductContext } from '../../Context/ProductContext'

const Hoodie = () => {
    const { productList } = useContext(ProductContext)
    console.log(productList)
    return (
        <div className='hoodie'>
            <h4>Baby Tee</h4>
            <div className="hoodie-list">
                {productList.filter(item => item.category === 'hoodie').map((item, index) => (
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

export default Hoodie