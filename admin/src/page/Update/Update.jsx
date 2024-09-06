import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Update.css';

const Update = ({ url }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state;

  const [name, setName] = useState(product.name);
  const [material, setMaterial] = useState(product.material);
  const [form, setForm] = useState(product.form);
  const [design, setDesign] = useState(product.design);
  const [oldPrice, setOldPrice] = useState(product.old_price);
  const [newPrice, setNewPrice] = useState(product.new_price);
  const [category, setCategory] = useState(product.category);
  const [color1, setColor1] = useState(product.color1);
  const [quantitySizeMcl1, setQuantitySizeMcl1] = useState(product.quantitysizeMcl1);
  const [quantitySizeLcl1, setQuantitySizeLcl1] = useState(product.quantitysizeLcl1);
  const [quantitySizeXLcl1, setQuantitySizeXLcl1] = useState(product.quantitysizeXLcl1);
  const [color2, setColor2] = useState(product.color2);
  const [quantitySizeMcl2, setQuantitySizeMcl2] = useState(product.quantitysizeMcl2);
  const [quantitySizeLcl2, setQuantitySizeLcl2] = useState(product.quantitysizeLcl2);
  const [quantitySizeXLcl2, setQuantitySizeXLcl2] = useState(product.quantitysizeXLcl2);
  const [color3, setColor3] = useState(product.color3);
  const [quantitySizeMcl3, setQuantitySizeMcl3] = useState(product.quantitysizeMcl3);
  const [quantitySizeLcl3, setQuantitySizeLcl3] = useState(product.quantitysizeLcl3);
  const [quantitySizeXLcl3, setQuantitySizeXLcl3] = useState(product.quantitysizeXLcl3);
  const [imagemain, setImagemain] = useState(null);
  const [imagelist1, setImagelist1] = useState(null);
  const [imagelist2, setImagelist2] = useState(null);
  const [imagelist3, setImagelist3] = useState(null);
  const [imagelist4, setImagelist4] = useState(null);
  const [imagelist5, setImagelist5] = useState(null);
  const [imagelist6, setImagelist6] = useState(null);
  const [imagelist7, setImagelist7] = useState(null);
  const [imageunder, setImageunder] = useState(null);

  const [imagePreview, setImagePreview] = useState({
    imagemain: product.imagemain ? `${url}/images/${product.imagemain}` : '',
    imagelist1: product.imagelist1 ? `${url}/images/${product.imagelist1}` : '',
    imagelist2: product.imagelist2 ? `${url}/images/${product.imagelist2}` : '',
    imagelist3: product.imagelist3 ? `${url}/images/${product.imagelist3}` : '',
    imagelist4: product.imagelist4 ? `${url}/images/${product.imagelist4}` : '',
    imagelist5: product.imagelist5 ? `${url}/images/${product.imagelist5}` : '',
    imagelist6: product.imagelist6 ? `${url}/images/${product.imagelist6}` : '',
    imagelist7: product.imagelist7 ? `${url}/images/${product.imagelist7}` : '',
    imageunder: product.imageunder ? `${url}/images/${product.imageunder}` : ''
  });

  useEffect(() => {
    // Set initial image previews if they exist
    setImagePreview(prev => ({
      ...prev,
      imagemain: product.imagemain ? `${url}/images/${product.imagemain}` : '',
      imagelist1: product.imagelist1 ? `${url}/images/${product.imagelist1}` : '',
      imagelist2: product.imagelist2 ? `${url}/images/${product.imagelist2}` : '',
      imagelist3: product.imagelist3 ? `${url}/images/${product.imagelist3}` : '',
      imagelist4: product.imagelist4 ? `${url}/images/${product.imagelist4}` : '',
      imagelist5: product.imagelist5 ? `${url}/images/${product.imagelist5}` : '',
      imagelist6: product.imagelist6 ? `${url}/images/${product.imagelist6}` : '',
      imagelist7: product.imagelist7 ? `${url}/images/${product.imagelist7}` : '',
      imageunder: product.imageunder ? `${url}/images/${product.imageunder}` : ''
    }));
  }, [product, url]);

  const handleImageChange = (e, setter, field) => {
    const file = e.target.files[0];
    setter(file);
    setImagePreview(prev => ({
      ...prev,
      [field]: URL.createObjectURL(file),
    }));
  };

  const validateForm = () => {
    return name && material && form && design && oldPrice && newPrice && category;
  };

  const updateProductDetails = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill out all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('id', product._id);
    formData.append('name', name);
    formData.append('material', material);
    formData.append('form', form);
    formData.append('design', design);
    formData.append('oldPrice', oldPrice);
    formData.append('newPrice', newPrice);
    formData.append('category', category);
    if (color1) {
      formData.append('color1', color1);
      formData.append('quantitySizeMcl1', quantitySizeMcl1);
      formData.append('quantitySizeLcl1', quantitySizeLcl1);
      formData.append('quantitySizeXLcl1', quantitySizeXLcl1);
    }

    if (color2) {
      formData.append('color2', color2);
      formData.append('quantitySizeMcl2', Number(quantitySizeLcl2));
      formData.append('quantitySizeLcl2', quantitySizeLcl2);
      formData.append('quantitySizeXLcl2', quantitySizeXLcl2);
    }

    if (color3) {
      formData.append('color3', color3);
      formData.append('quantitySizeMcl3', quantitySizeMcl3);
      formData.append('quantitySizeLcl3', quantitySizeLcl3);
      formData.append('quantitySizeXLcl3', quantitySizeXLcl3);
    }

    if (imagemain) formData.append('imagemain', imagemain);
    if (imagelist1) formData.append('imagelist1', imagelist1);
    if (imagelist2) formData.append('imagelist2', imagelist2);
    if (imagelist3) formData.append('imagelist3', imagelist3);
    if (imagelist4) formData.append('imagelist4', imagelist4);
    if (imagelist5) formData.append('imagelist5', imagelist5);
    if (imagelist6) formData.append('imagelist6', imagelist6);
    if (imagelist7) formData.append('imagelist7', imagelist7);
    if (imageunder) formData.append('imageunder', imageunder);
    console.log([...formData]);
    try {
      const response = await axios.put(`${url}/api/product/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/list');
      } else {
        toast.error('Error updating product');
      }
    } catch (error) {
      toast.error('Error updating product');
    }
  };

  return (
    <div className='update-product'>
      <h1>Update Product</h1>
      <form onSubmit={updateProductDetails}>
        <div>
          <label>Name: </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Material: </label>
          <input type="text" value={material} onChange={(e) => setMaterial(e.target.value)} />
        </div>
        <div>
          <label>Form: </label>
          <input type="text" value={form} onChange={(e) => setForm(e.target.value)} />
        </div>
        <div>
          <label>Design: </label>
          <input type="text" value={design} onChange={(e) => setDesign(e.target.value)} />
        </div>
        <div>
          <label>Old Price: </label>
          <input type="number" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} />
        </div>
        <div>
          <label>New Price: </label>
          <input type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
        </div>
        <div>
          <label>Category: </label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
        <div>
          <label>Color 1: </label>
          <input type="text" value={color1} onChange={(e) => setColor1(e.target.value)} />
          {color1 && (
            <div>
              <label>Quantity Size M: </label>
              <input type="number" value={quantitySizeMcl1} onChange={(e) => setQuantitySizeMcl1(e.target.value)} />
              <label>Quantity Size L: </label>
              <input type="number" value={quantitySizeLcl1} onChange={(e) => setQuantitySizeLcl1(e.target.value)} />
              <label>Quantity Size XL: </label>
              <input type="number" value={quantitySizeXLcl1} onChange={(e) => setQuantitySizeXLcl1(e.target.value)} />
            </div>
          )}
        </div>

        {/* Color 2 */}
        <div>
          <label>Color 2: </label>
          <input type="text" value={color2} onChange={(e) => setColor2(e.target.value)} />
          {color2 && (
            <div>
              <label>Quantity Size M: </label>
              <input type="number" value={quantitySizeMcl2} onChange={(e) => setQuantitySizeMcl2(e.target.value)} />
              <label>Quantity Size L: </label>
              <input type="number" value={quantitySizeLcl2} onChange={(e) => setQuantitySizeLcl2(e.target.value)} />
              <label>Quantity Size XL: </label>
              <input type="number" value={quantitySizeXLcl2} onChange={(e) => setQuantitySizeXLcl2(e.target.value)} />
            </div>
          )}
        </div>

        {/* Color 3 */}
        <div>
          <label>Color 3: </label>
          <input type="text" value={color3} onChange={(e) => setColor3(e.target.value)} />
          {color3 && (
            <div>
              <label>Quantity Size M: </label>
              <input type="number" value={quantitySizeMcl3} onChange={(e) => setQuantitySizeMcl3(e.target.value)} />
              <label>Quantity Size L: </label>
              <input type="number" value={quantitySizeLcl3} onChange={(e) => setQuantitySizeLcl3(e.target.value)} />
              <label>Quantity Size XL: </label>
              <input type="number" value={quantitySizeXLcl3} onChange={(e) => setQuantitySizeXLcl3(e.target.value)} />
            </div>
          )}
        </div>
        <div>
          <label>Main Image: </label>
          {imagePreview.imagemain && <img src={imagePreview.imagemain} alt="Main" style={{ width: '100px', height: 'auto' }} />}
          <input type="file" onChange={(e) => handleImageChange(e, setImagemain, 'imagemain')} />
        </div>
        <div>
          <label>Image List 1: </label>
          {imagePreview.imagelist1 && <img src={imagePreview.imagelist1} alt="Image List 1" style={{ width: '100px', height: 'auto' }} />}
          <input type="file" onChange={(e) => handleImageChange(e, setImagelist1, 'imagelist1')} />
        </div>
        <div>
          <label>Image List 2: </label>
          {imagePreview.imagelist2 && <img src={imagePreview.imagelist2} alt="Image List 1" style={{ width: '100px', height: 'auto' }} />}
          <input type="file" onChange={(e) => handleImageChange(e, setImagelist2, 'imagelist2')} />
        </div>
        <div>
          <label>Image List 3: </label>
          {imagePreview.imagelist3 && <img src={imagePreview.imagelist3} alt="Image List 1" style={{ width: '100px', height: 'auto' }} />}
          <input type="file" onChange={(e) => handleImageChange(e, setImagelist3, 'imagelist3')} />
        </div>
        <div>
          <label>Image List 4: </label>
          {imagePreview.imagelist4 && <img src={imagePreview.imagelist4} alt="Image List 4" style={{ width: '100px', height: 'auto' }} />}
          <input type="file" onChange={(e) => handleImageChange(e, setImagelist4, 'imagelist4')} />
        </div>
        <div>
          <label>Image List 5: </label>
          {imagePreview.imagelist5 && <img src={imagePreview.imagelist5} alt="Image List 5" style={{ width: '100px', height: 'auto' }} />}
          <input type="file" onChange={(e) => handleImageChange(e, setImagelist5, 'imagelist5')} />
        </div>
        <div>
          <label>Image List 6: </label>
          {imagePreview.imagelist6 && <img src={imagePreview.imagelist6} alt="Image List 6" style={{ width: '100px', height: 'auto' }} />}
          <input type="file" onChange={(e) => handleImageChange(e, setImagelist6, 'imagelist6')} />
        </div>
        <div>
          <label>Image List 7: </label>
          {imagePreview.imagelist7 && <img src={imagePreview.imagelist7} alt="Image List 7" style={{ width: '100px', height: 'auto' }} />}
          <input type="file" onChange={(e) => handleImageChange(e, setImagelist7, 'imagelist7')} />
        </div>
        <div>
          <label>Image Under: </label>
          {imagePreview.imageunder && <img src={imagePreview.imageunder} alt="Image Lunder" style={{ width: '100px', height: 'auto' }} />}
          <input type="file" onChange={(e) => handleImageChange(e, setImageunder, 'imageunder')} />
        </div>

        <button type="submit">Update Product</button>
      </form>
    </div>
  )
}

export default Update