import {Entity, model, property, hasMany} from '@loopback/repository';
import {Agencies} from './agencies.model';

@model()
export class Banks extends Entity {
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
  })
  url_api?: string;

  @hasMany(() => Agencies, {keyTo: 'banks_id'})
  agencies: Agencies[];

  constructor(data?: Partial<Banks>) {
    super(data);
  }
}

export interface BanksRelations {
  // describe navigational properties here
}

export type BanksWithRelations = Banks & BanksRelations;
