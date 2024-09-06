import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import './HomeProduct.css'
import { ProductContext } from '../../Context/ProductContext'
import ProductItem from '../ProductItem/ProductItem';
const HomeProduct = () => {
    const { productList } = useContext(ProductContext);
    const tshirtProduct = productList.filter(p => p.category === 't-shirt').sort(() => 0.5 - Math.random()).slice(0, 3);
    const babyProduct = productList.filter(p => p.category === 'babytee').sort(() => 0.5 - Math.random()).slice(0, 3);
    const poloProduct = productList.filter(p => p.category === 'polo').sort(() => 0.5 - Math.random()).slice(0, 3);
    const shirtProduct = productList.filter(p => p.category === 'shirt').sort(() => 0.5 - Math.random()).slice(0, 3);
    const jacketProduct = productList.filter(p => p.category === 'jacket').sort(() => 0.5 - Math.random()).slice(0, 3);
    const hoodieProduct = productList.filter(p => p.category === 'hoodie').sort(() => 0.5 - Math.random()).slice(0, 3);
    const pantsProduct = productList.filter(p => p.category === 'pants').sort(() => 0.5 - Math.random()).slice(0, 3);
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <div className='homeproduct'>
            <div className="tshirt">
                <h3>Áo thun</h3>
                <div className="tshirt-list">
                    {tshirtProduct.map(tshirtProduct => (
                        <ProductItem
                            key={tshirtProduct._id}
                            id={tshirtProduct._id}
                            image={tshirtProduct.imagemain}
                            name={tshirtProduct.name}
                            old_price={tshirtProduct.old_price}
                            new_price={tshirtProduct.new_price}
                        />
                    ))}
                    <Link onClick={scrollToTop} to='/tshirt'><span><p>Xem thêm</p></span></Link>
                </div>
            </div>


            <div className="babytee">
                <h3>Baby Tee</h3>
                <div className="babytee-list">
                    {babyProduct.map(babyProduct => (
                        <ProductItem
                            key={babyProduct._id}
                            id={babyProduct._id}
                            image={babyProduct.imagemain}
                            name={babyProduct.name}
                            old_price={babyProduct.old_price}
                            new_price={babyProduct.new_price}
                        />
                    ))}
                    <Link onClick={scrollToTop} to='/babytee'><span><p>Xem thêm</p></span></Link>
                </div>
            </div>


            <div className="polo">
                <h3>Áo polo</h3>
                <div className="polo-list">
                    {poloProduct.map(poloProduct => (
                        <ProductItem
                            key={poloProduct._id}
                            id={poloProduct._id}
                            image={poloProduct.imagemain}
                            name={poloProduct.name}
                            old_price={poloProduct.old_price}
                            new_price={poloProduct.new_price}
                        />
                    ))}
                    <Link onClick={scrollToTop} to='/polo'><span><p>Xem thêm</p></span></Link>
                </div>
            </div>


            <div className="shirt">
                <h3>Áo Sơ Mi</h3>
                <div className="shirt-list">
                    {shirtProduct.map(shirtProduct => (
                        <ProductItem
                            key={shirtProduct._id}
                            id={shirtProduct._id}
                            image={shirtProduct.imagemain}
                            name={shirtProduct.name}
                            old_price={shirtProduct.old_price}
                            new_price={shirtProduct.new_price}
                        />
                    ))}
                    <Link onClick={scrollToTop} to='/shirt'><span><p>Xem thêm</p></span></Link>
                </div>
            </div>


            <div className="jacket">
                <h3>Áo khoác</h3>
                <div className="jacket-list">
                    {jacketProduct.map(jacketProduct => (
                        <ProductItem
                            key={jacketProduct._id}
                            id={jacketProduct._id}
                            image={jacketProduct.imagemain}
                            name={jacketProduct.name}
                            old_price={jacketProduct.old_price}
                            new_price={jacketProduct.new_price}
                        />
                    ))}
                    <Link onClick={scrollToTop} to='/jacket'><span><p>Xem thêm</p></span></Link>
                </div>
            </div>


            <div className="hoodie">
                <h3>Hoodie</h3>
                <div className="hoodie-list">
                    {hoodieProduct.map(hoodieProduct => (
                        <ProductItem
                            key={hoodieProduct._id}
                            id={hoodieProduct._id}
                            image={hoodieProduct.imagemain}
                            name={hoodieProduct.name}
                            old_price={hoodieProduct.old_price}
                            new_price={hoodieProduct.new_price}
                        />
                    ))}
                    <Link  onClick={scrollToTop} to='/hoodie'><span><p>Xem thêm</p></span></Link>
                </div>
            </div>


            <div className="pants">
                <h3>Quần</h3>
                <div className="pants-list">
                    {pantsProduct.map(pantsProduct => (
                        <ProductItem
                            key={pantsProduct._id}
                            id={pantsProduct._id}
                            image={pantsProduct.imagemain}
                            name={pantsProduct.name}
                            old_price={pantsProduct.old_price}
                            new_price={pantsProduct.new_price}
                        />
                    ))}
                    <Link onClick={scrollToTop} to='/pants'><span><p>Xem thêm</p></span></Link>
                </div>
            </div>

        </div>
    )
}

export default HomeProduct