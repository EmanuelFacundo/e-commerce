import { Document } from 'mongoose'

export default interface  users  extends Document {
  id: string;
  username: string;
  password: string;
}