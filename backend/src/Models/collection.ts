import { model, Schema } from 'mongoose';
import collectionType from '../Interfaces/collection';

import { clothingSchema } from './clothing';

const collectionSchema:Schema = new Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  date: {type: String, required: true},
  clothes: {type: [clothingSchema], required: false}
})

export default model<collectionType>("Collection", collectionSchema)