import { Document } from 'mongoose'

export default interface  users  extends Document {
  username: string;
  password: string;
}