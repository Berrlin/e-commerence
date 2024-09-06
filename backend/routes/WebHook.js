import express from "express"

const express = require('express');
const router = express.Router();
const stripe = require('stripe')('your_stripe_secret_key'); // Thay thế bằng key của bạn
const productModel = require('./models/productModel'); // Thay thế bằng đường dẫn đúng tới model của bạn

// Webhook endpoint để nhận dữ liệu từ Stripe
router.post('/stripe-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = 'your_webhook_secret'; // Thay thế bằng endpoint secret của bạn

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Xử lý sự kiện checkout.session.completed
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // Lấy thông tin từ session
        const { metadata } = session;
        const orderId = metadata.orderId;

        // Tìm đơn hàng và cập nhật số lượng sản phẩm
        const order = await orderModel.findById(orderId);
        if (order) {
            for (const item of order.items) {
                const product = await productModel.findById(item.id);
                if (product) {
                    // Cập nhật số lượng sản phẩm trong cơ sở dữ liệu
                    const { size, color, quantity } = item;
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
                    }
                    
                    // Kiểm tra số lượng không được nhỏ hơn 0
                    if (product.quantitysizeMcl1 < 0 || product.quantitysizeLcl1 < 0 || product.quantitysizeXLcl1 < 0 ||
                        product.quantitysizeMcl2 < 0 || product.quantitysizeLcl2 < 0 || product.quantitysizeXLcl2 < 0 ||
                        product.quantitysizeMcl3 < 0 || product.quantitysizeLcl3 < 0 || product.quantitysizeXLcl3 < 0) {
                        return res.json({ success: false, message: "Insufficient stock" });
                    }

                    await product.save();
                }
            }
        }
    }

    res.json({ received: true });
});

module.exports = router;
