import mongoose from "mongoose";

const FeedbackSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    serviceId: {
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    }
})


const feedbackSchema = mongoose.model('Feedback', FeedbackSchema);


export default feedbackSchema