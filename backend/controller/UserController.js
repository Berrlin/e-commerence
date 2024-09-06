import userModel from '../model/UserModel.js';
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User Doesn't Exist" })
        }

        const isMath = await bcrypt.compare(password, user.password)
        if (!isMath) {
            return res.json({ success: false, message: "Wrong Password" })
        }
        const token = createToken(user._id)
        res.json({ success: true, token, userId: user._id })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Login Fail" })
    }
}



const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

const registerUser = async (req, res) => {
    const { name, email, phone, password } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User Already" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email" })
        }

        if (password.length < 5) {
            return res.json({ success: false, message: "Please a strong password" })
        }

        if (phone.length <= 9 || phone.length > 11) {
            return res.json({ success: false, message: "Phone must be 9 or 10 number" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name: name,
            email: email,
            phone: phone,
            password: hashedPassword
        })
        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({ success: true, token, userId: user._id });


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const listUser = async(req, res) => {
    try {
        const users = await userModel.find({});
        console.log("Fetched Users from DB:", users); // Kiểm tra dữ liệu trả về từ DB
        res.json({ success: true, data: users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.json({ success: false, message: "Không thể lấy danh sách người dùng" });
    }
};

const deleteUser = async(req,res)=>{
    try {
        await userModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Delete Success" });
    } catch (error) {
        res.json({ success: false, message: "Product not found" });
    }
}

const updateUser = async (req, res) => {
    const { id, name, email, phone, password } = req.body;

    try {
        // Tìm người dùng theo id
        const user = await userModel.findById(id);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Kiểm tra và cập nhật các thông tin mới
        if (email) {
            if (!validator.isEmail(email)) {
                return res.json({ success: false, message: "Please enter valid email" });
            }
            const emailExists = await userModel.findOne({ email });
            if (emailExists && emailExists._id.toString() !== id) {
                return res.json({ success: false, message: "Email already in use" });
            }
            user.email = email;
        }

        if (phone) {
            if (phone.length <= 9 || phone.length > 11) {
                return res.json({ success: false, message: "Phone must be 9 or 10 number" });
            }
            user.phone = phone;
        }

        if (name) {
            user.name = name;
        }

        if (password) {
            if (password.length < 5) {
                return res.json({ success: false, message: "Please enter a strong password" });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        // Lưu các thay đổi
        const updatedUser = await user.save();

        res.json({ success: true, data: updatedUser, message: "User updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        res.json({ success: false, message: "Error updating user" });
    }
};



export { loginUser, registerUser,listUser, deleteUser,updateUser}