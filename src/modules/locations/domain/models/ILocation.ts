export interface ILocation {
  id: number;
  name: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  created_at: Date;
  updated_at: Date;
}
