import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_accounts_id: {
        name: 'fk_accounts_transactions_id',
        entity: 'Accounts',
        entityKey: 'id',
        foreignKey: 'accounts_id',
      },
    },
  },
})
export class Transactions extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'number',
    required: true,
  })
  accounts_id: number;


  constructor(data?: Partial<Transactions>) {
    super(data);
  }
}

export interface TransactionsRelations {
  // describe navigational properties here
}

export type TransactionsWithRelations = Transactions & TransactionsRelations;
