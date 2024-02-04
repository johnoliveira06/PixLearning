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
  Accounts,
  Pixkeys,
} from '../models';
import {AccountsRepository} from '../repositories';

export class AccountsPixkeysController {
  constructor(
    @repository(AccountsRepository) protected accountsRepository: AccountsRepository,
  ) { }

  @get('/accounts/{id}/pixkeys', {
    responses: {
      '200': {
        description: 'Array of Accounts has many Pixkeys',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pixkeys)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pixkeys>,
  ): Promise<Pixkeys[]> {
    return this.accountsRepository.pixkeys(id).find(filter);
  }

  @post('/accounts/{id}/pixkeys', {
    responses: {
      '200': {
        description: 'Accounts model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pixkeys)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Accounts.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pixkeys, {
            title: 'NewPixkeysInAccounts',
            exclude: ['id'],
            optional: ['accounts_id']
          }),
        },
      },
    }) pixkeys: Omit<Pixkeys, 'id'>,
  ): Promise<Pixkeys> {
    return this.accountsRepository.pixkeys(id).create(pixkeys);
  }

  @patch('/accounts/{id}/pixkeys', {
    responses: {
      '200': {
        description: 'Accounts.Pixkeys PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pixkeys, {partial: true}),
        },
      },
    })
    pixkeys: Partial<Pixkeys>,
    @param.query.object('where', getWhereSchemaFor(Pixkeys)) where?: Where<Pixkeys>,
  ): Promise<Count> {
    return this.accountsRepository.pixkeys(id).patch(pixkeys, where);
  }

  @del('/accounts/{id}/pixkeys', {
    responses: {
      '200': {
        description: 'Accounts.Pixkeys DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pixkeys)) where?: Where<Pixkeys>,
  ): Promise<Count> {
    return this.accountsRepository.pixkeys(id).delete(where);
  }
}
