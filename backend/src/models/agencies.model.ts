import {Entity, model, property, hasMany} from '@loopback/repository';
import {Accounts} from './accounts.model';

@model({
  settings: {
    foreignKeys: {
      fk_banks_id: {
        name: 'fk_banks_id',
        entity: 'Banks',
        entityKey: 'id',
        foreignKey: 'banks_id',
      },
    },
  },
})
export class Agencies extends Entity {
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
    type: 'string',
  })
  description?: string;

  @property({
    type: 'number',
    required: true,
  })
  banks_id: number;

  @hasMany(() => Accounts, {keyTo: 'agencies_id'})
  accounts: Accounts[];

  constructor(data?: Partial<Agencies>) {
    super(data);
  }
}

export interface AgenciesRelations {
  // describe navigational properties here
}

export type AgenciesWithRelations = Agencies & AgenciesRelations;
