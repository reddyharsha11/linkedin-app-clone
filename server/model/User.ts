import mongoose from 'mongoose';
interface IUser {
  name: string;
  email: string;
  password?: string;
  headline?: string;
  avatar?: string;
}

// Then update your schema definition:
const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  headline: { type: String, default: 'LinkedIn Member' },
  avatar: {
    type: String,
    // Use an arrow function so 'this' isn't used, and take the document as an argument
    default: function(this: any) {
      // Check if 'this' exists and has a name, otherwise use a generic fallback
      const seedName = (this && this.name) ? this.name : 'User';
      return `https://api.dicebear.com/7.x/avataaars/png?seed=${seedName}`;
    }
  }
}, { timestamps: true });

const User = mongoose.model<IUser>('User', UserSchema);

export default User;