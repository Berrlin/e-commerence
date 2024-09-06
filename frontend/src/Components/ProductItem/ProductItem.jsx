import React, { useContext } from 'react';
import './ProductItem.css';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../Context/ProductContext';

const ProductItem = ({ id, image, name, old_price, new_price }) => {
    const { url } = useContext(ProductContext);
    const imageUrl = `${url}/images/${image}`;
    const discountPercentage = Math.round(((old_price - new_price) / old_price) * 100);
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <div className='product-item'>
            <div className='product-item-link'>
                <Link to={`/${id}`} onClick={scrollToTop}>
                    <div className="product-item-image">
                        <div className="discount-badge">
                            -{discountPercentage}%
                        </div>
                        <img src={imageUrl} alt={name} />
                    </div>
                    <p>{name}</p>
                </Link>
            </div>

            <div className="product-item-price">
                <p className="new-price">{new_price}.000đ</p>
                <p className="old-price">{old_price}.000đ</p>
            </div>

        </div>
    );
}

export default ProductItem;
