import { Document } from 'mongoose'
import image from './image';

export default interface clothing  extends Document {
  name: string;
  image: Array<image>;
  description: string;
  color: string;
  type: string;
  amount: number;
  size: string;
}