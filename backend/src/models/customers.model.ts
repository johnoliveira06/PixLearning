import {Entity, model, property, hasMany} from '@loopback/repository';
import {Accounts} from './accounts.model';

@model()
export class Customers extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  cpf: string;

  @property({
    type: 'string',
  })
  obs?: string;

  @hasMany(() => Accounts, {keyTo: 'customers_id'})
  accounts: Accounts[];

  constructor(data?: Partial<Customers>) {
    super(data);
  }
}

export interface CustomersRelations {
  // describe navigational properties here
}

export type CustomersWithRelations = Customers & CustomersRelations;
