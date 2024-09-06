import React,{useContext} from 'react'
import './Paint.css'
import ProductItem from '../../Components/ProductItem/ProductItem'
import { ProductContext } from '../../Context/ProductContext'

const Paint = () => {
    const { productList } = useContext(ProductContext)
    console.log(productList)
    return (
        <div className='pants'>
            <h4>Quần</h4>
            <div className="pants-list">
                {productList.filter(item => item.category === 'pants').map((item, index) => (
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

export default Paint