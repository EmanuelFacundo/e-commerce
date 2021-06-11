import { Schema } from 'mongoose';


const image = new Schema({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  key: { type: String, required: true },
  url: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

export default image;