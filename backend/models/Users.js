import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { 
    type: String, 
    required: true,
    trim: true, 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
   
  },
  password: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String,
    enum: ['U', 'A'], 
    default: 'U'
  },
  date: { 
    type: Date, 
    default: Date.now
  },
});

UserSchema.index({ email: 1 });
// Export the model
const User = mongoose.model("users", UserSchema);
export default User;
