import { Document } from 'mongoose'

export default interface image extends Document {
  name: String;
  size: Number;
  key: String;
  url: String;
  createdAt: { 
    type: Date;
    default: Date;
  }
}