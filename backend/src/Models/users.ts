import { model, Schema } from 'mongoose';
import users from '../Interfaces/user'

export const userSchema: Schema = new Schema({
  id: { type: String, required: true },
  username: { type: String, required: true},
  password: { type: String, min: 6, max: 12, required: true}
})

export default model<users>("User", userSchema)