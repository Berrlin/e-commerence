import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './List.css';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/product/list`);
      console.log(response.data);

      if (response.data && typeof response.data === 'object') {
        if (response.data.success && Array.isArray(response.data.data)) {
          setList(response.data.data.filter(item => item)); // Only set valid items
        } else {
          toast.error("Unexpected response structure.");
        }
      } else {
        toast.error("API returned an invalid response.");
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error("Error fetching list. Please try again later.");
    }
  };

  const handleEdit = (product) => {
    navigate('/update', {state: {product}})// Use query parameters for editing
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(`${url}/api/product/delete`, { id: id });
      toast.success("Product deleted successfully");
      fetchList(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product. Please try again.");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredList = list.filter(product =>
    product.name.toLowerCase().includes(searchQuery) &&
    (selectedCategory === '' || product.category === selectedCategory)
  );

  return (
    <div className="list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="category-dropdown"
        >
          <option value="">All Categories</option>
          <option value="t-shirt">T-Shirt</option>
          <option value="babytee">Babytee</option>
          <option value="polo">Polo</option>
          <option value="shirt">Shirt</option>
          <option value="jacket">Jacket</option>
          <option value="hoodie">Hoodie</option>
          <option value="pants">Pants</option>
          <option value="womenpants">Womenpants</option>
          <option value="accessory">Accessory</option>
        </select>
      </div>

      {filteredList.length > 0 ? (
        filteredList.map((product) => (
          <div key={product._id} className="product-item">
            <img src={`${url}/images/${product.imagemain}`} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Material: {product.material}</p>
            <p>Form: {product.form}</p>
            <p>Design: {product.design}</p>
            <p>Old Price: ${product.old_price.toFixed(3)}</p>
            <p>New Price: ${product.new_price.toFixed(3)}</p>
            <p>Category: {product.category}</p>

            <div className="color-block">
              <p>Color 1: {product.color1}</p>
              <p>Size M: {product.quantitysizeMcl1}</p>
              <p>Size L: {product.quantitysizeLcl1}</p>
              <p>Size XL: {product.quantitysizeXLcl1}</p>
            </div>

            {product.color2 && (
              <div className="color-block">
                <p>Color 2: {product.color2}</p>
                <p>Size M: {product.quantitysizeMcl2}</p>
                <p>Size L: {product.quantitysizeLcl2}</p>
                <p>Size XL: {product.quantitysizeXLcl2}</p>
              </div>
            )}

            {product.color3 && (
              <div className="color-block">
                <p>Color 3: {product.color3}</p>
                <p>Size M: {product.quantitysizeMcl3}</p>
                <p>Size L: {product.quantitysizeLcl3}</p>
                <p>Size XL: {product.quantitysizeXLcl3}</p>
              </div>
            )}

            <div className="button-group">
              <button onClick={() => handleEdit(product)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(product._id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default List;
