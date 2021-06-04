import { Document } from 'mongoose'
import clothing from './clothing'

export default interface collection extends Document {
  name: string;
  date: string;
  clothes: Array<clothing>
}