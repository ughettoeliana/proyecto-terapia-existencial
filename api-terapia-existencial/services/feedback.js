import feedbackSchema from "../schemas/feedback.js";

const createFeedback = async (feedbackData) => {
  try {
    const feedback = new feedbackSchema(feedbackData);
    const savedFeedback= await feedback.save();
    return savedFeedback;
  } catch (error) {
    throw error;
  }
};

const getFeedbacks = async () => {
  try {
    const foundFeedback = await feedbackSchema.find();
    return foundFeedback;
  } catch (error) {
    throw error;
  }
};

const getFeedbackById = async (id) => {
  try {
    const foundFeedback = await feedbackSchema.findById(id);
    return foundFeedback;
  } catch (error) {
    throw error;
  }
};

const getFeedbackByServiceId = async (serviceId) => {
  try {
    const foundFeedback = await feedbackSchema.find({ serviceId });
    return foundFeedback;
  } catch (error) {
    throw error;
  }
};

const updateFeedback = async (id, { userId, serviceId, comment}) => {
  try {
    const updateFeedback = await feedbackSchema.updateOne(
      { _id: id },
      { $set: { userId, serviceId, comment}}
    );
    return updateFeedback;
  } catch (error) {
    throw error;
  }
};

const deleteFeedback = async (id) => {
  try {
    const deletedFeedback = await feedbackSchema.findOneAndDelete({ _id: id });
    return deletedFeedback;
  } catch (error) {
    throw error;
  }
};

export default { createFeedback, getFeedbacks, getFeedbackById, updateFeedback, deleteFeedback, getFeedbackByServiceId };
