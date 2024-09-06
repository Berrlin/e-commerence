import React, { useContext } from 'react';
import { ProductContext } from '../../Context/ProductContext';
import ProductItem from '../ProductItem/ProductItem';
import { useLocation } from 'react-router-dom';
import './SearchResult.css'
const SearchResult = () => {
    const { searchProducts } = useContext(ProductContext);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const searchResults = searchProducts(query);

    return (
        <div className='search-page'>
            <h2>Kết quả tìm kiếm cho: "{query}"</h2>
            <div className='search-results'>
                {searchResults.length > 0 ? (
                    searchResults.map(product => (
                        <ProductItem
                            key={product.id}
                            id={product._id}
                            image={product.imagemain}
                            name={product.name}
                            old_price={product.old_price}
                            new_price={product.new_price}
                        />
                    ))
                ) : (
                    <div className='notfound'><p>Không tìm thấy sản phẩm nào.</p></div>


                )}
            </div>
        </div>
    );
}

export default SearchResult;
