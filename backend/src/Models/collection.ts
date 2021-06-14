import { model, Schema } from 'mongoose';
import collectionType from '../Interfaces/collection';

import { clothingSchema } from './clothing';

const collectionSchema: Schema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
  clothes: { type: [clothingSchema], required: false }
})

export default model<collectionType>("Collection", collectionSchema)