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
  Agencies,
  Accounts,
} from '../models';
import {AgenciesRepository} from '../repositories';

export class AgenciesAccountsController {
  constructor(
    @repository(AgenciesRepository) protected agenciesRepository: AgenciesRepository,
  ) { }

  @get('/agencies/{id}/accounts', {
    responses: {
      '200': {
        description: 'Array of Agencies has many Accounts',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Accounts)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Accounts>,
  ): Promise<Accounts[]> {
    return this.agenciesRepository.accounts(id).find(filter);
  }

  @post('/agencies/{id}/accounts', {
    responses: {
      '200': {
        description: 'Agencies model instance',
        content: {'application/json': {schema: getModelSchemaRef(Accounts)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Agencies.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Accounts, {
            title: 'NewAccountsInAgencies',
            exclude: ['id'],
            optional: ['agencies_id']
          }),
        },
      },
    }) accounts: Omit<Accounts, 'id'>,
  ): Promise<Accounts> {
    return this.agenciesRepository.accounts(id).create(accounts);
  }

  @patch('/agencies/{id}/accounts', {
    responses: {
      '200': {
        description: 'Agencies.Accounts PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Accounts, {partial: true}),
        },
      },
    })
    accounts: Partial<Accounts>,
    @param.query.object('where', getWhereSchemaFor(Accounts)) where?: Where<Accounts>,
  ): Promise<Count> {
    return this.agenciesRepository.accounts(id).patch(accounts, where);
  }

  @del('/agencies/{id}/accounts', {
    responses: {
      '200': {
        description: 'Agencies.Accounts DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Accounts)) where?: Where<Accounts>,
  ): Promise<Count> {
    return this.agenciesRepository.accounts(id).delete(where);
  }
}
