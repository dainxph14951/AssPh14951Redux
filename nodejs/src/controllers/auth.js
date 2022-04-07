import User from "../models/users";
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        const { name, phonenumber, address, email, password } = req.body; // gửi require  lên server
        const existUser = await User.findOne({email}).exec();
        if(existUser){
            return res.status(401).json({ // kiểm tra sự tồn tại
                messager: 'User đã tồn tại'
            })
        }
        const user = await new User({ name, phonenumber, address, email, password}).save(); //lấy dữ liệu gửi lên
        res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.json(400).json({
            messager: 'không tạo được tài khoản'
        })
    }

}
export const signin = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email}).exec();
    if(!user){
       return res.status(400).json({
            messager: 'User không tồn tại'
        })
    }
    if(!user.authenticate(password)){
        return res.status(400).json({
            messager: 'Sai mật khẩu'
        })
    }
    const token = jwt.sign({_id: user.id}, '123456', { expiresIn: 60 * 60 });
    res.json({
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        }
    })
}