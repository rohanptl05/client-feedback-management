import mongoose from "mongoose";
const { Schema } = mongoose;

const FeedbacksSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Refers to the User model
  },
  subject: { 
    type: String,
    required: true,
  },
  feedback: { 
    type: String,
    required: true,
  },
  date: { 
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Pending', 'Resolved', 'Under Review'],
    default: 'Pending',
  },
  attachment: {
    type: String, // File path or URL
  },
  response: {
    type: String, // Admin response
  },
  resolvedDate: {
    type: Date, // When the feedback was resolved
  },
  category: {
    type: String,
    enum: ['Bug', 'Feature Request', 'Complaint', 'General'],
    default: 'General',
  },
});
FeedbacksSchema.index({ user: 1 });

// Export the model
export default mongoose.model("feedbacks", FeedbacksSchema);
