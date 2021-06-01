import { model, Schema } from 'mongoose';

import personType from '../Interfaces/person';
import { addressSchema } from './address';
import { userSchema } from './users';

const personSchema:Schema = new Schema({
  id: { type: String, required: true },
  user: { type: userSchema, required: true },
  name: { type: String, required: true},
  cpf: { type: String, required: false},
  cnpj: { type: String, required: false},
  email: { type: String, required: true},
  cell : { type: String, required: false},
  phone: { type: String, required: false},
  address: { type: [addressSchema], required: true}
})

export default model<personType>("Person", personSchema)