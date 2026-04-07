import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Prevents duplicate accounts
  },
  password: {
    type: String,
    required: true,
  },
  headline: {
    type: String,
    default: 'LinkedIn Member', // Default fallback
  },
  avatar: {
    type: String,
    default: function() {
      // Automatically generates a unique avatar based on their name
      return `https://api.dicebear.com/7.x/avataaars/png?seed=${this.name}`;
    }
  }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);