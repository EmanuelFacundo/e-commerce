import { Document } from 'mongoose'

export default interface clothing  extends Document {
  name: string;
  image: string;
  description: string;
  color: string;
  type: string;
  amount: number;
  size: string;
}