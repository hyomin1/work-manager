import { Schema, model } from "mongoose";

interface IDestination {
  destination: string;
}

const destinationSchema = new Schema<IDestination>({
  destination: { type: String, required: true, trim: true },
});

const Destination = model<IDestination>("Destination", destinationSchema);
export default Destination;
