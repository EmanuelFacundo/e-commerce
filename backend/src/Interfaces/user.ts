import { Document } from 'mongoose'

export default interface  user  extends Document {
  id: string;
  username: string;
  password: string;
}