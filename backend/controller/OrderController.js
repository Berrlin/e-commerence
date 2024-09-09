import Stripe from 'stripe'
import orderModel from '../model/OrderModel.js'
import userModel from '../model/UserModel.js'
import axios from 'axios'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount.finalAmount,
            size: req.body.size,
            address: req.body.address,
        });
        await newOrder.save();

        // Xóa dữ liệu giỏ hàng của người dùng
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const updatingList = [];
        const line_items = req.body.items.map((item) => {
            updatingList.push({productId: "abc", soldQuatity: 10})
            return {
                price_data: {
                    currency: "vnd",
                    product_data: {
                        name: item.name
                    },
                    unit_amount: item.price * 100 * 10
                },
                quantity: item.quantity
            };
        });

        // Update product's quatity after made an order
        await 

        line_items.push({
            price_data: {
                currency: "vnd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 30 * 100 * 10
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};




const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, mesesage: "Paid" })
        } else {
            await orderModel.findByIdAndUpdate(orderId);
            res.json({ success: false, mesesage: "Not Paid" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, mesesage: "Loi Thanh Toan" })
    }
}

//user orders for frontend
const userOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, mesesage:"Loi USerOrders"})
    }
}

//Listing orders for admin panel
const listOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Loi listing order for admin"})
    }
}

//api for updating order status
const updateStatus = async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success: true,mesesage:"Status Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,mesesage:"Update Status FAILED"})
    }
}



export { placeOrder, verifyOrder,userOrders ,listOrders, updateStatus}