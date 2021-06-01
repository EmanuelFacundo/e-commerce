import { Document } from 'mongoose'
import address from './address'
import user from './user'

export default interface person  extends Document {
  id: string;
  name: string;
  cpf?: string;
  cnpj?: string;
  email?: string;
  cell?: string;
  phone?: string;
  address?: Array<address>;
}