import mongoose from "mongoose";
const { Schema } = mongoose;

const FeedbacksSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Refers to the User model
  },
  title: { 
    type: String,
    required: true,
  },
  desc: { 
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
    default: null,
  },
  priorities: {
    type: String,
    default: 'Low', 
  },
  response: {
    type: String, // Admin response
    default: null,
  },
  resolvedDate: {
    type: Date, // When the feedback was resolved
    default: null,
  },
  category: {
    type: String,
    default: 'General',
  },
});
FeedbacksSchema.index({ user: 1 });

// Export the model
export default mongoose.model("feedbacks", FeedbacksSchema);
