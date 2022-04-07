import mongoose from "mongoose";
import { createHmac } from "crypto";
import {v4 as uuidv4 } from "uuid";


const userSchema = mongoose.Schema(
    {
    name:{
        type: String,
        required: true,
        maxLength: 30
    },
    phonenumber: {
        type: Number,    
        required: true,
        maxLength: 30
    },
    address: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
    },
    salt:{
        type :String
    },
    role: {
        type: Number,
        default: 0
    },

    },{ timestamps: true }
);
userSchema.methods = {
    encryptPassword(password){ //b2
        if(!password) return;
        try {
            onsole.log('password da ma hoa', createHmac('sha256', this.salt).update(password).digest('hex'))
            return createHmac('sha256',this.salt).update(password).digest('hex'); // createHmac phương thức trong crypto
        } catch (error) {
            console.log(error);
        }
    },
    authenticate(password){
        console.log('password in method', password);
        console.log('this.password == this.encrytPassword(password)', this.password == this.encryptPassword(password))
        return this.password == this.encryptPassword(password);
    },
}
userSchema.pre("save", async function save(next){ // b1 'save' midthewe của mogo  
    try {
        console.log('this.password', this.password);
            this.salt = uuidv4();
            this.password = this.encryptPassword(this.password); // truyền mật khẩu lấy đc vào phương thức encryptPassword
            return next();
    } catch (error) {
            return next(error)
    }
});
export default mongoose.model('User', userSchema);