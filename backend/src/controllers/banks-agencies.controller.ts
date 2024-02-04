import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Banks,
  Agencies,
} from '../models';
import {BanksRepository} from '../repositories';

export class BanksAgenciesController {
  constructor(
    @repository(BanksRepository) protected banksRepository: BanksRepository,
  ) { }

  @get('/banks/{id}/agencies', {
    responses: {
      '200': {
        description: 'Array of Banks has many Agencies',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Agencies)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Agencies>,
  ): Promise<Agencies[]> {
    return this.banksRepository.agencies(id).find(filter);
  }

  @post('/banks/{id}/agencies', {
    responses: {
      '200': {
        description: 'Banks model instance',
        content: {'application/json': {schema: getModelSchemaRef(Agencies)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Banks.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agencies, {
            title: 'NewAgenciesInBanks',
            exclude: ['id'],
            optional: ['banks_id']
          }),
        },
      },
    }) agencies: Omit<Agencies, 'id'>,
  ): Promise<Agencies> {
    return this.banksRepository.agencies(id).create(agencies);
  }

  @patch('/banks/{id}/agencies', {
    responses: {
      '200': {
        description: 'Banks.Agencies PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agencies, {partial: true}),
        },
      },
    })
    agencies: Partial<Agencies>,
    @param.query.object('where', getWhereSchemaFor(Agencies)) where?: Where<Agencies>,
  ): Promise<Count> {
    return this.banksRepository.agencies(id).patch(agencies, where);
  }

  @del('/banks/{id}/agencies', {
    responses: {
      '200': {
        description: 'Banks.Agencies DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Agencies)) where?: Where<Agencies>,
  ): Promise<Count> {
    return this.banksRepository.agencies(id).delete(where);
  }
}
