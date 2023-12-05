import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    token: String,
    email: String,
  });

 const tokenSchema = mongoose.model('Token', TokenSchema);


export default tokenSchema