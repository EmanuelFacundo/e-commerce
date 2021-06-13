import { Document } from 'mongoose'
import image from './image';

export default interface clothing  extends Document {
  name: string;
  images: Array<image>;
  description: string;
  color: string;
  type: string;
  amount: number;
  size: string;
}