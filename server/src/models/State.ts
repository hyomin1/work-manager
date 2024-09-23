import { Schema, model } from "mongoose";

interface IState {
  state: string;
}

const stateSchema = new Schema<IState>({
  state: { type: String, required: true, trim: true },
});

const State = model<IState>("State", stateSchema);
export default State;
