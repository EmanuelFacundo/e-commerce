import { Document } from 'mongoose'
import image from './image';

export default interface clothing  extends Document {
  name: string;
  description: string;
  colors: Array<{
    color: string;
    images: Array<image>;
  }>;
  type: string;
  amount: number;
  size: string;
}