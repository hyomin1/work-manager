import { model, Schema } from "mongoose";

interface IAdmin {
  userId: string;
  password: string;
  createdAt: Date;
}

const adminSchema = new Schema<IAdmin>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = model<IAdmin>("Admin", adminSchema);
export default Admin;
