import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    photo:String
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

 const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
export default UserModel