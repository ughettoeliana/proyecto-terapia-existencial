import mongoose from "mongoose";

const ServiceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    modality: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})


const serviceSchema = mongoose.model('Service', ServiceSchema);


export default serviceSchema