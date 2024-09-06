import React, { useContext, useState,useRef } from 'react';
import { ProductContext } from '../../Context/ProductContext';
import ProductItem from '../../Components/ProductItem/ProductItem';
import './All.css';

const All = () => {
  const { productList } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productList.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(productList.length / productsPerPage);
  const ProductsRef = useRef(null);

  const scrollToProduct = () => {
    ProductsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToProduct();
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      scrollToProduct();
    }
  };

  return (
    <div className='all' ref={ProductsRef}>
      <h4>Tất cả sản phẩm</h4>
      <div className="all-list">
        {currentProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            old_price={item.old_price}
            new_price={item.new_price}
            image={item.imagemain}
          />
        ))}
      </div>
      <div className="pagination">
        <div>
          <button onClick={prevPage} disabled={currentPage === 1}>
            Trang trước
          </button>
        </div>
        <div>
          <span>Trang {currentPage}/{totalPages}</span>
        </div>
        <div>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Trang tiếp theo
          </button>
        </div>


      </div>
    </div>
  );
};

export default All;
