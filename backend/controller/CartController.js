import userModel from "../model/UserModel.js";

const addToCart = async (req, res) => {
    try {
        const { id,userId, itemId, color, size, quantity, price, imagemain, name } = req.body;

        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        const key = `${itemId}-${color}-${size}`;

        //Chuyển đổi cartData thành đối tượng nếu đang sử dụng Map
        if (cartData instanceof Map) {
            cartData = Object.fromEntries(cartData);
        }

        console.log('Before Update:', cartData);

        if (!cartData[key]) {
            cartData[key] = { id, quantity, color, size, price, imagemain, name };
        } else {
            cartData[key].quantity += quantity;
        }

        //Chuyển đổi cartData trở lại thành Map nếu cần thiết
        if (typeof cartData === 'object') {
            cartData = new Map(Object.entries(cartData));
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        console.log('After Update:', cartData);

        res.json({ success: true, message: "Added to Cart" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


const decreaseqtyCart = async (req, res) => {
    try {
        const { userId, itemId, color, size } = req.body;

        // Tìm người dùng
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData ? Object.fromEntries(userData.cartData) : {};
        const key = `${itemId}-${color}-${size}`;

        if (cartData[key]) {
            // Giảm số lượng sản phẩm đi 1
            if (cartData[key].quantity > 1) {
                cartData[key].quantity -= 1;
            } else {
                // Xóa sản phẩm khỏi giỏ hàng nếu số lượng <= 0
                delete cartData[key];
            }

            // Cập nhật dữ liệu giỏ hàng trên cơ sở dữ liệu
            const updatedCartData = new Map(Object.entries(cartData));
            await userModel.findByIdAndUpdate(userId, { cartData: updatedCartData });
            res.json({ success: true, message: "Removed From Cart" });
        } else {
            res.status(404).json({ success: false, message: "Item not found in cart" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};



const increaseqtyCart = async (req, res) => {
    try {

        const { userId, itemId, color, size } = req.body;

        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = Array.from(userData.cartData).reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

        const key = `${itemId}-${color}-${size}`;
        console.log('Cart Data:', cartData);
        console.log('Key:', key);

        if (cartData[key]) {
            // Tăng số lượng sản phẩm thêm 1
            cartData[key].quantity += 1;

            // Chuyển đổi đối tượng thành Map trước khi lưu
            const updatedCartData = new Map(Object.entries(cartData));

            await userModel.findByIdAndUpdate(userId, { cartData: updatedCartData });
            res.json({ success: true, message: "Cart updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "Item not found in cart" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId, color, size } = req.body;

        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData ? Object.fromEntries(userData.cartData) : {};
        const key = `${itemId}-${color}-${size}`;

        if (cartData[key]) {
            delete cartData[key];

            const updatedCartData = new Map(Object.entries(cartData));
            await userModel.findByIdAndUpdate(userId, { cartData: updatedCartData });
            res.json({ success: true, message: "Item removed from cart" });
        } else {
            res.status(404).json({ success: false, message: "Item not found in cart" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


const clearCart = async (req, res) => {
    try {
        const { userId } = req.body;

        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        userData.cartData = {}; // Xóa toàn bộ dữ liệu giỏ hàng
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Cart cleared successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


const getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        res.json({ success: true, cartData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


export { addToCart, decreaseqtyCart, getCart, increaseqtyCart, clearCart, removeFromCart };
