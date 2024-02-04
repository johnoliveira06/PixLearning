import {Entity, model, property, hasMany} from '@loopback/repository';
import {Pixkeys} from './pixkeys.model';
import {Transactions} from './transactions.model';

@model({
  settings: {
    foreignKeys: {
      fk_agencies_id: {
        name: 'fk_agencies_id',
        entity: 'Agencies',
        entityKey: 'id',
        foreignKey: 'agencies_id',
      },
      fk_customers_id:{
        name: 'fk_customers_id',
        entity: 'Customers',
        entityKey: 'id',
        foreignKey: 'customers_id',
      }
    },
  },
})
export class Accounts extends Entity {
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
  number: string;

  @property({
    type: 'number',
    required: true,
  })
  balance: number;

  @property({
    type: 'number',
    required: true,
  })
  agencies_id: number;

  @property({
    type: 'number',
    required: true,
  })
  customers_id: number;

  @hasMany(() => Pixkeys, {keyTo: 'accounts_id'})
  pixkeys: Pixkeys[];

  @hasMany(() => Transactions, {keyTo: 'accounts_id'})
  transactions: Transactions[];

  constructor(data?: Partial<Accounts>) {
    super(data);
  }
}

export interface AccountsRelations {
  // describe navigational properties here
}

export type AccountsWithRelations = Accounts & AccountsRelations;
