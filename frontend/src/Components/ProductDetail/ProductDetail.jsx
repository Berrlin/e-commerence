import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../Context/ProductContext';
import { toast } from 'react-toastify';
import './ProductDetail.css'
import star_dull from '../../assets/star_dull_icon.png'
import star from '../../assets/star_icon.png'
import back from '../../assets/back.png'
import delivery from '../../assets/delivery.png'
import ProductItem from '../ProductItem/ProductItem';
const ProductDetail = () => {
    const { id } = useParams();
    const { productList, url, addToCart, token, userId } = useContext(ProductContext); // Ensure userId is available
    const product = productList.find(p => p._id === id);
    if (!product) {
        return <div>Product not found</div>;
    }

    const [imagemain, setImagemain] = useState(product.imagemain);
    const imageUrl = `${url}/images/${imagemain}`;
    const [currentIndex, setCurrentIndex] = useState(0);

    const imageList = [
        product.imagemain,
        product.imagelist1,
        product.imagelist2,
        product.imagelist3,
        product.imagelist4,
        product.imagelist5,
        product.imagelist6,
        product.imagelist7
    ].filter(img => img);

    const visibleImages = 6;
    const maxIndex = imageList.length - visibleImages;

    const handleNext = () => {
        if (currentIndex < maxIndex) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const displayedImages = imageList.slice(currentIndex, currentIndex + visibleImages);
    const oldPrice = parseFloat(product.old_price);
    const newPrice = parseFloat(product.new_price);
    const discountPercentage = oldPrice > 0 ? ((oldPrice - newPrice) / oldPrice) * 100 : 0;
    const [color, setColor] = useState(product.color1);
    const [quantity, setQuantity] = useState(1);
    const similarProducts = productList
        .filter(p => p.category === product.category && p._id !== product._id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

    const [size, setSize] = useState('M');

    const getQuantityForSelectedOptions = () => {
        if (color === product.color1) {
            if (size === 'M') return product.quantitysizeMcl1;
            if (size === 'L') return product.quantitysizeLcl1;
            if (size === 'XL') return product.quantitysizeXLcl1;
        } else if (color === product.color2) {
            if (size === 'M') return product.quantitysizeMcl2;
            if (size === 'L') return product.quantitysizeLcl2;
            if (size === 'XL') return product.quantitysizeXLcl2;
        } else if (color === product.color3) {
            if (size === 'M') return product.quantitysizeMcl3;
            if (size === 'L') return product.quantitysizeLcl3;
            if (size === 'XL') return product.quantitysizeXLcl3;
        }
        return 0;
    };

    

    useEffect(() => {
        const updatedMaxQuantity = getQuantityForSelectedOptions();
        if (quantity > updatedMaxQuantity) {
            setQuantity(updatedMaxQuantity);
        }
    }, [color, size, product]);


    useEffect(() => {
        setImagemain(product.imagemain);
        setColor(product.color1);
        setSize('M');
        setQuantity(1);
    }, [product]);
    const maxQuantity = getQuantityForSelectedOptions();

    const handleColorChange = (event) => {
        setColor(event.target.value);
        setQuantity(1); // Reset quantity when changing color
    };

    const handleSizeChange = (newSize) => {
        setSize(newSize);
        setQuantity(1); // Reset quantity when changing size
    };

    const handleIncreaseQuantity = () => {
        if (quantity < maxQuantity) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = async () => {
        try {
            console.log('Sending data to server:', { userId, itemId: product._id, color, size, quantity, price: product.new_price, imagemain: product.imagemain, name: product.name });
            if (token) {
                await addToCart({
                    userId,
                    id: product._id,
                    color,
                    size,
                    quantity,
                    price: product.new_price,
                    imagemain: product.imagemain,
                    name: product.name
                });
                toast.success('Product added to cart');
            } else {
                toast.error("Vui lòng đăng nhập")
            }

        } catch (error) {
            alert('Failed to add product to cart');
        }
    };

    const handleBuyNow = async () => {
        try {
            if (token) {
                await addToCart({
                    userId,
                    id: product._id,
                    color,
                    size,
                    quantity,
                    price: product.new_price,
                    imagemain: product.imagemain,
                    name: product.name
                });

            } else {
                toast.error('Vui lòng đăng nhập');
            }
        } catch (error) {
            alert('Failed to add product to cart');
        }
    };

    const isOutOfStock = maxQuantity === 0;

    const descriptionRef = useRef(null);
    const similarProductsRef = useRef(null);

    // Scroll to the ref on button click
    const scrollToDescription = () => {
        descriptionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToSimilarProducts = () => {
        similarProductsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <div>
            <div className='productdetail'>
                <div className="productdetail-left">
                    <div className="productdetail-left-imagemain">
                        <img src={imageUrl} alt={product.name} />
                    </div>
                    <div className="productdetail-left-imagelist">
                        <button className="productdetail-left-imagelist-arrow prev" onClick={handlePrev}>&lt;</button>
                        <div className="productdetail-left-imagelist-wrapper">
                            {displayedImages.map((img, index) => (
                                <img
                                    key={index}
                                    onClick={() => setImagemain(img)}
                                    src={`${url}/images/${img}`}
                                    alt=""
                                    className={img === imagemain ? 'active' : ''}
                                />
                            ))}
                        </div>
                        <button className="productdetail-left-imagelist-arrow next" onClick={handleNext}>&gt;</button>
                    </div>
                    <div className="productdetail-left-button">
                        <button onClick={scrollToDescription}>MÔ TẢ SẢN PHẨM</button>
                        <button onClick={scrollToSimilarProducts}>SẢN PHẨM TƯƠNG TỰ</button>
                    </div>
                </div>
                <div className="productdetail-right">
                    <h2>{product.name}</h2>
                    <hr />
                    <div className="productdetail-right-star">
                        <img src={star} alt="" />
                        <img src={star} alt="" />
                        <img src={star} alt="" />
                        <img src={star} alt="" />
                        <img src={star_dull} alt="" />
                    </div>
                    <div className="productdetail-right-price">
                        <p>{product.new_price}.000đ</p>
                        <p className="old-price">{product.old_price}.000đ</p>
                        {oldPrice > 0 && (
                            <p className="discount-percentage">- {discountPercentage.toFixed(0)}%</p>
                        )}
                    </div>
                    <div className="productdetail-right-poli">
                        <div className="productdetail-right-poli1">
                            <img src={back} alt="" />
                            <p>Đổi trả dễ dàng</p>
                        </div>
                        <div className="productdetail-right-poli2">
                            <img src={back} alt="" />
                            <p>Chính hãng 100%</p>
                        </div>
                        <div className="productdetail-right-poli3">
                            <img src={delivery} alt="" />
                            <p>Giao toàn quốc</p>
                        </div>
                    </div>
                    <div className="productdetail-right-info">
                        <p>Thông tin sản phẩm:</p>
                        <p>- Chất liệu: {product.material}</p>
                        <p>- Form: {product.form}</p>
                        <p>- Màu sắc:
                            {product.color1}
                            {product.color2 && `/${product.color2}`}
                            {product.color3 && `/${product.color3}`}
                        </p>
                        <p>- Thiết kế: {product.design}</p>
                    </div>
                    <div className="productdetail-right-color">
                        <p>Màu sắc: {color}</p>
                        <select name="colors" id="color-select" value={color} onChange={handleColorChange}>
                            {product.color1 && <option value={product.color1}>{product.color1}</option>}
                            {product.color2 && <option value={product.color2}>{product.color2}</option>}
                            {product.color3 && <option value={product.color3}>{product.color3}</option>}
                        </select>
                    </div>
                    <div className="productdetail-right-size">
                        <p>Kích thước: {size}</p>
                        <div className="productdetail-right-size-sizes">
                            <p
                                onClick={() => handleSizeChange('M')}
                                style={{ backgroundColor: size === 'M' ? 'black' : 'transparent', color: size === 'M' ? 'white' : 'black' }}>
                                M
                            </p>
                            <p
                                onClick={() => handleSizeChange('L')}
                                style={{ backgroundColor: size === 'L' ? 'black' : 'transparent', color: size === 'L' ? 'white' : 'black' }}>
                                L
                            </p>
                            <p
                                onClick={() => handleSizeChange('XL')}
                                style={{ backgroundColor: size === 'XL' ? 'black' : 'transparent', color: size === 'XL' ? 'white' : 'black' }}>
                                XL
                            </p>
                        </div>
                        <Link to='/size'><p>+ Hướng dẫn chọn size</p></Link>
                    </div>
                    <div className="productdetail-right-quantity">
                        <p>Số lượng</p>
                        <div className="quantity-controls">
                            <button onClick={handleDecreaseQuantity}>-</button>
                            <input type="number" value={quantity} readOnly />
                            <button onClick={handleIncreaseQuantity}>+</button>
                        </div>
                        <p>Còn lại: {maxQuantity} sản phẩm</p>
                    </div>
                    <div className="productdetail-right-cart">
                        {isOutOfStock ? (
                            <button className="out-of-stock-button">HẾT HÀNG</button>
                        ) : (
                            <>
                                <button onClick={handleAddToCart}>THÊM VÀO GIỎ</button>
                                <Link to='/checkout' onClick={scrollToTop}><button onClick={handleBuyNow}>MUA NGAY</button></Link>
                            </>
                        )}


                    </div>
                </div>
                <div className="productdetail-bot" ref={descriptionRef}>
                    <div className="productdetail-bot-top">
                        <p>Thông tin sản phẩm:</p>
                        <p>- Chất liệu: {product.material}</p>
                        <p>- Form: {product.form}</p>
                        <p>- Màu sắc:
                            {product.color1}
                            {product.color2 && `/${product.color2}`}
                            {product.color3 && `/${product.color3}`}
                        </p>
                        <p>- Thiết kế: {product.design}</p>
                        <img src={`${url}/images/${product.imageunder}`} alt="" />
                    </div>
                    <div className="productdetail-bot-desc">
                        <p>Về TEELAB:</p>
                        <br />
                        <p>You will never be younger than you are at this very moment “Enjoy Your Youth!”</p>
                        <br />
                        <p>Không chỉ là thời trang, TEELAB còn là “phòng thí nghiệm” của tuổi trẻ - nơi nghiên cứu và cho ra đời năng lượng mang tên “Youth”. Chúng mình luôn muốn tạo nên những trải nghiệm vui vẻ, năng động và trẻ trung.</p>
                        <p>Lấy cảm hứng từ giới trẻ, sáng tạo liên tục, bắt kịp xu hướng và phát triển đa dạng các dòng sản phẩm là cách mà chúng mình hoạt động để tạo nên phong cách sống hằng ngày của bạn. Mục tiêu của TEELAB là cung cấp các sản phẩm thời trang chất lượng cao với giá thành hợp lý.</p>
                        <p>Chẳng còn thời gian để loay hoay nữa đâu youngers ơi! Hãy nhanh chân bắt lấy những những khoảnh khắc tuyệt vời của tuổi trẻ. TEELAB đã sẵn sàng trải nghiệm cùng bạn!</p>
                        <br />
                        <p>“Enjoy Your Youth”, now!</p>
                        <br />
                        <p>Hướng dẫn sử dụng sản phẩm Teelab:</p>
                        <p>- Ngâm áo vào NƯỚC LẠNH có pha giấm hoặc phèn chua từ trong 2 tiếng đồng hồ</p>
                        <p>- Giặt ở nhiệt độ bình thường, với đồ có màu tương tự.</p>
                        <p>- Không dùng hóa chất tẩy.</p>
                        <p>- Hạn chế sử dụng máy sấy và ủi (nếu có) thì ở nhiệt độ thích hợp.</p>
                        <br />
                        <p>Chính sách bảo hành:</p>
                        <p>- Miễn phí đổi hàng cho khách mua ở TEELAB trong trường hợp bị lỗi từ nhà sản xuất, giao nhầm hàng, bị hư hỏng trong quá trình vận chuyển hàng.</p>
                        <p>- Sản phẩm đổi trong thời gian 3 ngày kể từ ngày nhận hàng</p>
                        <p>- Sản phẩm còn mới nguyên tem, tags và mang theo hoá đơn mua hàng, sản phẩm chưa giặt và không dơ bẩn, hư hỏng bởi những tác nhân bên ngoài cửa hàng sau khi mua hàng.</p>
                    </div>
                </div>
            </div>

            <div className="productdetail-similar" ref={similarProductsRef}>

                <h2>SẢN PHẨM TƯƠNG TỰ</h2>
                <hr />
                <div className="productdetail-similar-list">
                    {similarProducts.map(similarProduct => (
                        <ProductItem
                            key={similarProduct._id}
                            id={similarProduct._id}
                            image={similarProduct.imagemain}
                            name={similarProduct.name}
                            old_price={similarProduct.old_price}
                            new_price={similarProduct.new_price}
                        />
                    ))}
                </div>
            </div>
        </div>



    );
}

export default ProductDetail;
