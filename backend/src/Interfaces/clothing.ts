import { Document } from 'mongoose'

export default interface clothing  extends Document {
  id: string;
  name: string;
  description: string;
  color: string;
  type: string;
  amount: number;
  size: string;
}