import { model, Schema } from 'mongoose';
import personType from '../Interfaces/person';

const userType = {
  id: String,
  username: String,
  password: String
}

const addressType = {
  street: String,
  number: Number,
  apartment: String,
  block: String,
  complement: String,
  district: String,
  city: String,
  country: String,
  zipCode: String,
}

const personSchema:Schema = new Schema({
  id: { type: String, required: true },
  user: { type: userType, required: true },
  name: { type: String, required: true},
  cpf: { type: String, required: false},
  cnpj: { type: String, required: false},
  email: { type: String, required: true},
  cell : { type: String, required: false},
  phone: { type: String, required: false},
  address: { type: [addressType], required: true}

})

export default model<personType>("Person", personSchema)