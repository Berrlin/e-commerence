import { error } from "console";
import productModel from "../model/ProductModel.js";
import fs from 'fs'

const addProduct = async (req, res) => {
    const { imagemain, imagelist1, imagelist2, imagelist3, imagelist4, imagelist5, imagelist6, imagelist7, imageunder }
        = req.files;
    const image_filename = {
        imagemain: imagemain ? imagemain[0].filename : undefined,
        imagelist1: imagelist1 ? imagelist1[0].filename : undefined,
        imagelist2: imagelist2 ? imagelist2[0].filename : undefined,
        imagelist3: imagelist3 ? imagelist3[0].filename : undefined,
        imagelist4: imagelist4 ? imagelist4[0].filename : undefined,
        imagelist5: imagelist5 ? imagelist5[0].filename : undefined,
        imagelist6: imagelist6 ? imagelist6[0].filename : undefined,
        imagelist7: imagelist7 ? imagelist7[0].filename : undefined,
        imageunder: imageunder ? imageunder[0].filename : undefined,

    }

    const product = new productModel({
        name: req.body.name,
        material: req.body.material,
        form: req.body.form,
        design: req.body.design,
        old_price: Number(req.body.old_price),
        new_price: Number(req.body.new_price),
        category: req.body.category,
        color1: req.body.color1,
        color2: req.body.color2,
        color3: req.body.color3,
        quantitycolor1: req.body.quantitycolor1,
        quantitycolor2: req.body.quantitycolor2,
        quantitycolor3: req.body.quantitycolor3,
        quantitysizeMcl1: req.body.quantitysizeMcl1,
        quantitysizeLcl1: req.body.quantitysizeLcl1,
        quantitysizeXLcl1: req.body.quantitysizeXLcl1,
        quantitysizeMcl2: req.body.quantitysizeMcl2,
        quantitysizeLcl2: req.body.quantitysizeLcl2,
        quantitysizeXLcl2: req.body.quantitysizeXLcl2,
        quantitysizeMcl3: req.body.quantitysizeMcl3,
        quantitysizeLcl3: req.body.quantitysizeLcl3,
        quantitysizeXLcl3: req.body.quantitysizeXLcl3,
        imagemain: image_filename.imagemain,
        imagelist1: image_filename.imagelist1,
        imagelist2: image_filename.imagelist2,
        imagelist3: image_filename.imagelist3,
        imagelist4: image_filename.imagelist4,
        imagelist5: image_filename.imagelist5,
        imagelist6: image_filename.imagelist6,
        imagelist7: image_filename.imagelist7,
        imageunder: image_filename.imageunder,
    })
    try {
        await product.save();
        res.json({ success: true, message: "Added Success" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Add FAILED" })
    }
}

const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, data: products })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "List FAIL" })
    }
}

const deleteProduct = async (req, res) => {
    try {
        // Tìm sản phẩm trong cơ sở dữ liệu theo ID
        const product = await productModel.findById(req.body.id);

        if (product) {
            const imageToDelete = [
                product.imagemain,
                product.imagelist1,
                product.imagelist2,
                product.imagelist3,
                product.imagelist4,
                product.imagelist5,
                product.imagelist6,
                product.imagelist7,
                product.imageunder
            ];

            // Xóa tất cả các hình ảnh trong mảng nếu chúng có giá trị hợp lệ
            imageToDelete.forEach((image) => {
                if (image) { // Chỉ xóa nếu image có giá trị hợp lệ
                    fs.unlink(`uploads/${image}`, (err) => {
                        if (err) {
                            console.error(`Error deleting image ${image}:`, err);
                        }
                    });
                }
            });


            await productModel.findByIdAndDelete(req.body.id);
            res.json({ success: true, message: "Delete Success" });
        } else {
            res.json({ success: false, message: "Product not found" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Delete Fail" });
    }
};

const searchProductByName = async (req, res) => {
    try {
        const searchQuery = req.query.name;
        if (!searchQuery) {
            return res.json({ success: false, message: "No search query provided" });
        }

        const products = await productModel.find({
            name: { $regex: new RegExp(searchQuery, 'i') }
        });

        if (products.length > 0) {
            res.json({ success: true, products });
        } else {
            res.json({ success: false, message: "No products found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Search Failed" });
    }
};


const updateProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.id);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        product.name = req.body.name || product.name;
        product.material = req.body.material || product.material;
        product.form = req.body.form || product.form;
        product.design = req.body.design || product.design;
        product.old_price = Number(req.body.oldPrice) || Number(product.old_price);
        product.new_price = Number(req.body.newPrice) || Number(product.new_price);
        product.category = req.body.category || product.category;
        product.color1 = req.body.color1 || product.color1;
        product.color2 = req.body.color2 || product.color2;
        product.color3 = req.body.color3 || product.color3;
        product.quantitycolor1 = Number(req.body.quantitycolor1) || product.quantitycolor1;
        product.quantitycolor2 = Number(req.body.quantitycolor2) || product.quantitycolor2;
        product.quantitycolor3 = Number(req.body.quantitycolor3) || product.quantitycolor3;
        product.quantitysizeMcl1 = Number(req.body.quantitysizeMcl1) || product.quantitysizeMcl1;
        product.quantitysizeLcl1 = Number(req.body.quantitysizeLcl1) || product.quantitysizeLcl1;
        product.quantitysizeXLcl1 = Number(req.body.quantitysizeXLcl1) || product.quantitysizeXLcl1;
        product.quantitysizeMcl2 = Number(req.body.quantitysizeMcl2) || product.quantitysizeMcl2;
        product.quantitysizeLcl2 = Number(req.body.quantitysizeLcl2) || product.quantitysizeLcl2;
        product.quantitysizeXLcl2 = Number(req.body.quantitysizeXLcl2) || product.quantitysizeXLcl2;
        product.quantitysizeMcl3 = Number(req.body.quantitysizeMcl3) || product.quantitysizeMcl3;
        product.quantitysizeLcl3 = Number(req.body.quantitysizeLcl3) || product.quantitysizeLcl3;
        product.quantitysizeXLcl3 = Number(req.body.quantitysizeXLcl3) || product.quantitysizeXLcl3;


        console.log("Product before saving:", product);
        // Cập nhật hình ảnh nếu có tệp mới
        const files = req.files || {};

        const {
            imagemain,
            imagelist1,
            imagelist2,
            imagelist3,
            imagelist4,
            imagelist5,
            imagelist6,
            imagelist7,
            imageunder
        } = files;

        if (imagemain) {
            if (product.imagemain) {
                fs.unlink(`uploads/${product.imagemain}`, (err) => {
                    if (err) console.error(`Error deleting image ${product.imagemain}:`, err);
                });
            }
            product.imagemain = imagemain[0].filename;
        }

        if (imagelist1) {
            if (product.imagelist1) {
                fs.unlink(`uploads/${product.imagelist1}`, (err) => {
                    if (err) console.error(`Error deleting image ${product.imagelist1}:`, err);
                });
            }
            product.imagelist1 = imagelist1[0].filename;
        }

        if (imagelist2) {
            if (product.imagelist2) {
                fs.unlink(`uploads/${product.imagelist2}`, (err) => {
                    if (err) console.error(`Error deleting image ${product.imagelist2}:`, err);
                });
            }
            product.imagelist2 = imagelist2[0].filename;
        }

        if (imagelist3) {
            if (product.imagelist3) {
                fs.unlink(`uploads/${product.imagelist3}`, (err) => {
                    if (err) console.error(`Error deleting image ${product.imagelist3}:`, err);
                });
            }
            product.imagelist3 = imagelist3[0].filename;
        }

        if (imagelist4) {
            if (product.imagelist4) {
                fs.unlink(`uploads/${product.imagelist4}`, (err) => {
                    if (err) console.error(`Error deleting image ${product.imagelist4}:`, err);
                });
            }
            product.imagelist4 = imagelist4[0].filename;
        }

        if (imagelist5) {
            if (product.imagelist5) {
                fs.unlink(`uploads/${product.imagelist5}`, (err) => {
                    if (err) console.error(`Error deleting image ${product.imagelist5}:`, err);
                });
            }
            product.imagelist5 = imagelist5[0].filename;
        }

        if (imagelist6) {
            if (product.imagelist6) {
                fs.unlink(`uploads/${product.imagelist6}`, (err) => {
                    if (err) console.error(`Error deleting image ${product.imagelist6}:`, err);
                });
            }
            product.imagelist6 = imagelist6[0].filename;
        }

        if (imagelist7) {
            if (product.imagelist7) {
                fs.unlink(`uploads/${product.imagelist7}`, (err) => {
                    if (err) console.error(`Error deleting image ${product.imagelist7}:`, err);
                });
            }
            product.imagelist7 = imagelist7[0].filename;
        }

        if (imageunder) {
            if (product.imageunder) {
                fs.unlink(`uploads/${product.imageunder}`, (err) => {
                    if (err) console.error(`Error deleting image ${product.imageunder}:`, err);
                });
            }
            product.imageunder = imageunder[0].filename;
        }

        await product.save();
        res.json({ success: true, message: "Update Success" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Update Fail" });
    }
};


const updateProductQuantity = async (req, res) => {
    try {
        const { id, size, color, quantity, payment } = req.body;

        if (!payment) {
            return res.json({ success: false, message: "Payment not confirmed" });
        }

        const product = await productModel.findById(id);

        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        if (color === product.color1) {
            if (size === 'M') product.quantitysizeMcl1 -= quantity;
            if (size === 'L') product.quantitysizeLcl1 -= quantity;
            if (size === 'XL') product.quantitysizeXLcl1 -= quantity;
        } else if (color === product.color2) {
            if (size === 'M') product.quantitysizeMcl2 -= quantity;
            if (size === 'L') product.quantitysizeLcl2 -= quantity;
            if (size === 'XL') product.quantitysizeXLcl2 -= quantity;
        } else if (color === product.color3) {
            if (size === 'M') product.quantitysizeMcl3 -= quantity;
            if (size === 'L') product.quantitysizeLcl3 -= quantity;
            if (size === 'XL') product.quantitysizeXLcl3 -= quantity;
        } else {
            return res.json({ success: false, message: "Invalid color" });
        }

        // Kiểm tra số lượng không được nhỏ hơn 0
        if (product.quantitysizeMcl1 < 0 || product.quantitysizeLcl1 < 0 || product.quantitysizeXLcl1 < 0 ||
            product.quantitysizeMcl2 < 0 || product.quantitysizeLcl2 < 0 || product.quantitysizeXLcl2 < 0 ||
            product.quantitysizeMcl3 < 0 || product.quantitysizeLcl3 < 0 || product.quantitysizeXLcl3 < 0) {
            return res.json({ success: false, message: "Insufficient stock" });
        }

        await product.save();
        res.json({ success: true, message: "Quantity updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Update quantity failed" });
    }
};


export { addProduct, listProduct, deleteProduct, searchProductByName, updateProduct,updateProductQuantity};

