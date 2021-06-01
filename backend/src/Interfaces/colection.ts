import { Document } from 'mongoose'
import clothing from './clothing'

export default interface collection extends Document {
  id: string;
  name: string;
  date: string;
  clothes: Array<clothing>
}