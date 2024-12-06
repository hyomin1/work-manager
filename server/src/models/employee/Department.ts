import { model, Schema } from 'mongoose';

interface IDepartment {
  department: string;
}

const departmentSchema = new Schema<IDepartment>({
  department: { type: String, required: true, trim: true },
});

const Department = model<IDepartment>('Department', departmentSchema);
export default Department;
