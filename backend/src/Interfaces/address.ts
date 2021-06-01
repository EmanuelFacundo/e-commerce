import { Document } from 'mongoose'

export default interface address  extends Document {
  street: string;
  number: number;
  apartment?: string;
  block?: string;
  complement?: string;
  district: string;
  city: string;
  country: string;
  zipCode: string;
}