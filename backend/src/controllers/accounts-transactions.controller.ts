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
  Transactions,
} from '../models';
import {AccountsRepository} from '../repositories';

export class AccountsTransactionsController {
  constructor(
    @repository(AccountsRepository) protected accountsRepository: AccountsRepository,
  ) { }

  @get('/accounts/{id}/transactions', {
    responses: {
      '200': {
        description: 'Array of Accounts has many Transactions',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Transactions)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Transactions>,
  ): Promise<Transactions[]> {
    return this.accountsRepository.transactions(id).find(filter);
  }

  @post('/accounts/{id}/transactions', {
    responses: {
      '200': {
        description: 'Accounts model instance',
        content: {'application/json': {schema: getModelSchemaRef(Transactions)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Accounts.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transactions, {
            title: 'NewTransactionsInAccounts',
            exclude: ['id'],
            optional: ['accounts_id']
          }),
        },
      },
    }) transactions: Omit<Transactions, 'id'>,
  ): Promise<Transactions> {
    return this.accountsRepository.transactions(id).create(transactions);
  }

  @patch('/accounts/{id}/transactions', {
    responses: {
      '200': {
        description: 'Accounts.Transactions PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transactions, {partial: true}),
        },
      },
    })
    transactions: Partial<Transactions>,
    @param.query.object('where', getWhereSchemaFor(Transactions)) where?: Where<Transactions>,
  ): Promise<Count> {
    return this.accountsRepository.transactions(id).patch(transactions, where);
  }

  @del('/accounts/{id}/transactions', {
    responses: {
      '200': {
        description: 'Accounts.Transactions DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Transactions)) where?: Where<Transactions>,
  ): Promise<Count> {
    return this.accountsRepository.transactions(id).delete(where);
  }
}
