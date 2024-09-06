import express from 'express'
import { addProduct, deleteProduct, listProduct, searchProductByName, updateProduct, updateProductQuantity} from '../controller/ProductController.js'
import upload from '../config/upload.js';

const productRoute = express.Router();

productRoute.post("/add",upload.fields([
    {name: 'imagemain',maxCount:1},
    {name: 'imagelist1',maxCount:1},
    {name: 'imagelist2',maxCount:1},
    {name: 'imagelist3',maxCount:1},
    {name: 'imagelist4',maxCount:1},
    {name: 'imagelist5',maxCount:1},
    {name: 'imagelist6',maxCount:1},
    {name: 'imagelist7',maxCount:1},
    {name: 'imageunder',maxCount:1},

]),addProduct)

productRoute.get("/list",listProduct)
productRoute.post("/delete",deleteProduct)
productRoute.get('/search', searchProductByName);
productRoute.put('/update', upload.fields([
    { name: 'imagemain', maxCount: 1 },
    { name: 'imagelist1', maxCount: 1 },
    { name: 'imagelist2', maxCount: 1 },
    { name: 'imagelist3', maxCount: 1 },
    { name: 'imagelist4', maxCount: 1 },
    { name: 'imagelist5', maxCount: 1 },
    { name: 'imagelist6', maxCount: 1 },
    { name: 'imagelist7', maxCount: 1 },
    { name: 'imageunder', maxCount: 1 }
]), updateProduct);
productRoute.post("/updatequantity",updateProductQuantity)

export default productRoute 