import { model, Schema } from 'mongoose';
import users from '../Interfaces/users'

const usersSchema: Schema = new Schema({
  username: { type: 'string', required: true},
  password: { type: 'string', min: 6, max: 12, required: true}
})

export default model<users>("User", usersSchema)