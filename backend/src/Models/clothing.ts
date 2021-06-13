import { model, Schema } from 'mongoose';
import clothingType from '../Interfaces/clothing'
import image from './image';

export const clothingSchema: Schema = new Schema({
  name: { type: String, required: true },
  images: { type: [image], required: true },
  description: { type: String, required: true },
  color: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  size: { type: String, required: true }
})

export default model<clothingType>("Clothing", clothingSchema)