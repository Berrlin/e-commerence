import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Add.css'; // Đảm bảo đã tạo hoặc chỉnh sửa tệp CSS này
import upload from '../../assets/upload.png';

const Add = ({ url }) => {
  const [formData, setFormData] = useState({
    name: '',
    material: '',
    form: '',
    design: '',
    old_price: '',
    new_price: '',
    category: '',
    color1: '',
    quantitysizeMcl1: '',
    quantitysizeLcl1: '',
    quantitysizeXLcl1: '',
    color2: '',
    quantitysizeMcl2: '',
    quantitysizeLcl2: '',
    quantitysizeXLcl2: '',
    color3: '',
    quantitysizeMcl3: '',
    quantitysizeLcl3: '',
    quantitysizeXLcl3: '',
    imagemain: '',
    imagelist1: '',
    imagelist2: '',
    imagelist3: '',
    imagelist4: '',
    imagelist5: '',
    imagelist6: '',
    imagelist7: '',
    imageunder: '',
  });

  const [showColor2, setShowColor2] = useState(false);
  const [showColor3, setShowColor3] = useState(false);
  const [showAdditionalImages, setShowAdditionalImages] = useState(false);

  const [images, setImages] = useState({
    imagemain: null,
    imagelist1: null,
    imagelist2: null,
    imagelist3: null,
    imagelist4: null,
    imagelist5: null,
    imagelist6: null,
    imagelist7: null,
    imageunder: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const { name } = e.target;
    setImages(prevImages => ({
      ...prevImages,
      [name]: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hàm kiểm tra số lượng
    const validateQuantities = () => {
      const quantities = [
        formData.quantitysizeMcl1,
        formData.quantitysizeLcl1,
        formData.quantitysizeXLcl1,
        formData.quantitysizeMcl2,
        formData.quantitysizeLcl2,
        formData.quantitysizeXLcl2,
        formData.quantitysizeMcl3,
        formData.quantitysizeLcl3,
        formData.quantitysizeXLcl3
      ];
      return quantities.every(qty => qty >= 0);
    };

    // Hàm kiểm tra hình ảnh
    const validateImages = () => {
      const requiredImages = ['imagemain', 'imagelist1', 'imagelist2', 'imagelist3', 'imagelist4', 'imagelist5'];
      return requiredImages.every(img => images[img] !== null);
    };

    if (!validateQuantities()) {
      alert("All quantities must be greater than or equal to 0.");
      return;
    }

    if (!validateImages()) {
      alert("Please upload all at least 5 images.");
      return;
    }
    // Chuyển đổi hình ảnh thành form data
    const form = new FormData();
    form.append('name', formData.name);
    form.append('material', formData.material);
    form.append('form', formData.form);
    form.append('design', formData.design);
    form.append('old_price', formData.old_price);
    form.append('new_price', formData.new_price);
    form.append('category', formData.category);
    form.append('color1', formData.color1);
    form.append('quantitysizeMcl1', Number(formData.quantitysizeMcl1));
    form.append('quantitysizeLcl1', Number(formData.quantitysizeLcl1));
    form.append('quantitysizeXLcl1', Number(formData.quantitysizeXLcl1));
    if (showColor2) {
      form.append('color2', formData.color2);
      form.append('quantitysizeMcl2', formData.quantitysizeMcl2);
      form.append('quantitysizeLcl2', formData.quantitysizeLcl2);
      form.append('quantitysizeXLcl2', formData.quantitysizeXLcl2);
    }
    if (showColor3) {
      form.append('color3', formData.color3);
      form.append('quantitysizeMcl3', formData.quantitysizeMcl3);
      form.append('quantitysizeLcl3', formData.quantitysizeLcl3);
      form.append('quantitysizeXLcl3', formData.quantitysizeXLcl3);
    }
    for (const [key, file] of Object.entries(images)) {
      if (file) {
        form.append(key, file);
      }
    }

    try {
      await axios.post(`${url}/api/product/add`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/list');
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };


  return (
    <div className="add-product">
      <h1 className="title">Add New Product</h1>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label className="form-label">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" required />
        </div>
        <div className="form-group">
          <label className="form-label">Material</label>
          <input type="text" name="material" value={formData.material} onChange={handleChange} className="form-input" required />
        </div>
        <div className="form-group">
          <label className="form-label">Form</label>
          <input type="text" name="form" value={formData.form} onChange={handleChange} className="form-input" required />
        </div>
        <div className="form-group">
          <label className="form-label">Design</label>
          <input type="text" name="design" value={formData.design} onChange={handleChange} className="form-input" required />
        </div>
        <div className="form-group">
          <label className="form-label">Old Price</label>
          <input type="number" name="old_price" value={formData.old_price} onChange={handleChange} className="form-input" required />
        </div>
        <div className="form-group">
          <label className="form-label">New Price</label>
          <input type="number" name="new_price" value={formData.new_price} onChange={handleChange} className="form-input" required />
        </div>
        <div className="form-group">
          <label className="form-label">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} className="form-input" required>
            <option value="">Select Category</option>
            <option value="t-shirt">T-shirt</option>
            <option value="babytee">Babytee</option>
            <option value="polo">Polo</option>
            <option value="shirt">Shirt</option>
            <option value="jacket">Jacket</option>
            <option value="hoodie">Hoodie</option>
            <option value="pants">Pants</option>
            <option value="womenpants">Women Pants</option>
            <option value="accessory">Accessory</option>
          </select>
        </div>

        {/* Color 1 */}
        <div className="color-section">
          <label className="form-label">Color 1</label>
          <input type="text" name="color1" value={formData.color1} onChange={handleChange} className="form-input" />
          <div className="form-group">
            <label className="form-label">Size M Quantity Color 1</label>
            <input type="number" name="quantitysizeMcl1" value={formData.quantitysizeMcl1} onChange={handleChange} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Size L Quantity Color 1</label>
            <input type="number" name="quantitysizeLcl1" value={formData.quantitysizeLcl1} onChange={handleChange} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Size XL Quantity Color 1</label>
            <input type="number" name="quantitysizeXLcl1" value={formData.quantitysizeXLcl1} onChange={handleChange} className="form-input" />
          </div>
        </div>

        {/* Color 2 */}
        <button type="button" className="toggle-button" onClick={() => setShowColor2(!showColor2)}>
          {showColor2 ? 'Hide Color 2' : 'Add Color 2'}
        </button>
        {showColor2 && (
          <div className="color-section">
            <label className="form-label">Color 2</label>
            <input type="text" name="color2" value={formData.color2} onChange={handleChange} className="form-input" />
            <div className="form-group">
              <label className="form-label">Size M Quantity Color 2</label>
              <input type="number" name="quantitysizeMcl2" value={formData.quantitysizeMcl2} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Size L Quantity Color 2</label>
              <input type="number" name="quantitysizeLcl2" value={formData.quantitysizeLcl2} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Size XL Quantity Color 2</label>
              <input type="number" name="quantitysizeXLcl2" value={formData.quantitysizeXLcl2} onChange={handleChange} className="form-input" />
            </div>
          </div>
        )}

        {/* Color 3 */}
        <button type="button" className="toggle-button" onClick={() => setShowColor3(!showColor3)}>
          {showColor3 ? 'Hide Color 3' : 'Add Color 3'}
        </button>
        {showColor3 && (
          <div className="color-section">
            <label className="form-label">Color 3</label>
            <input type="text" name="color3" value={formData.color3} onChange={handleChange} className="form-input" />
            <div className="form-group">
              <label className="form-label">Size M Quantity Color 3</label>
              <input type="number" name="quantitysizeMcl3" value={formData.quantitysizeMcl3} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Size L Quantity Color 3</label>
              <input type="number" name="quantitysizeLcl3" value={formData.quantitysizeLcl3} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Size XL Quantity Color 3</label>
              <input type="number" name="quantitysizeXLcl3" value={formData.quantitysizeXLcl3} onChange={handleChange} className="form-input" />
            </div>
          </div>
        )}

        {/* Image Upload */}
        <div className="image-upload">
          <div className="form-group">
            <label className="form-label">Main Image</label>
            <input type="file" name="imagemain" accept="image/*" onChange={handleImageChange} className="form-input" />
          </div>
          {showAdditionalImages && (
            <>
              {Array.from({ length: 7 }).map((_, index) => (
                <div className="form-group" key={index}>
                  <label className="form-label">Image {index + 1}</label>
                  <input type="file" name={`imagelist${index + 1}`} accept="image/*" onChange={handleImageChange} className="form-input" />
                </div>
              ))}
            </>
          )}

          <button type="button" className="toggle-button" onClick={() => setShowAdditionalImages(!showAdditionalImages)}>
            {showAdditionalImages ? 'Hide Additional Images' : 'Add Additional Images'}
          </button>
          <div className="form-group">
            <label className='form-label'>Under Main Image</label>
            <input type="file" name="imageunder" accept="image/*" onChange={handleImageChange} className="form-input" />
          </div>
        </div>

        <button type="submit" className="submit-button">Add Product</button>
      </form>
    </div>
  );
};

export default Add;
