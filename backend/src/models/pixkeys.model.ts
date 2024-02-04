import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_accounts_id: {
        name: 'fk_accounts_pix_id',
        entity: 'Accounts',
        entityKey: 'id',
        foreignKey: 'accounts_id',
      },
    },
  },
})
export class Pixkeys extends Entity {
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
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  key: string;

  @property({
    type: 'number',
    required: true,
  })
  accounts_id: number;


  constructor(data?: Partial<Pixkeys>) {
    super(data);
  }
}

export interface PixkeysRelations {
  // describe navigational properties here
}

export type PixkeysWithRelations = Pixkeys & PixkeysRelations;
