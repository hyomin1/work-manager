import { model, Schema } from 'mongoose';

interface IUser {
  userId: string;
  password: string;
  role: number;
}

const userSchema = new Schema<IUser>(
  {
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>('User', userSchema);
export default User;
