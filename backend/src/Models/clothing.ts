import { model, Schema } from 'mongoose';
import clothingType from '../Interfaces/clothing'

export const clothingSchema: Schema = new Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  description: {type: String, required: true},
  color: {type: String, required: true},
  type: {type: String, required: true},
  amount: {type: Number, required: true},
  size: {type: Number, required: true}
})

export default model<clothingType>("Clothing", clothingSchema)