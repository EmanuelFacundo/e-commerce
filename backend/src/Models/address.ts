import { model, Schema } from 'mongoose';
import addressType from '../Interfaces/address'

export const addressSchema = new Schema({
  street: { type: String, require: true },
  number: { type: Number, require: true },
  block: { type: String, require: false },
  complement: { type: String, require: false },
  district: { type: String, require: true },
  city: { type: String, require: true },
  country: { type: String, require: true },
  zipCode: { type: String, require: true }
})

export default model<addressType>("Address", addressSchema)