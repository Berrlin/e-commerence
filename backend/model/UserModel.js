import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    cartData: { 
        type: Map, // Consider using Map if cartData is more dynamic
        of: new mongoose.Schema({
            quantity: { type: Number, required: true },
            color: { type: String, required: true },
            size: { type: String, required: true },
            price: { type: Number, required: true },
            imagemain: { type: String },
            name: { type: String },
            id: {type: String}
        }, { _id: false }), 
        default: {}
    }
}, { minimize: false });

const userModel = mongoose.models.User || mongoose.model('User', userSchema);

export default userModel;
