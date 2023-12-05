import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: 'user' 
    }
})


const userSchema = mongoose.model('User', UserSchema);
 

export default userSchema