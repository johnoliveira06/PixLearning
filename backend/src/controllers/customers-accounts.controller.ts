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
  Customers,
  Accounts,
} from '../models';
import {CustomersRepository} from '../repositories';

export class CustomersAccountsController {
  constructor(
    @repository(CustomersRepository) protected customersRepository: CustomersRepository,
  ) { }

  @get('/customers/{id}/accounts', {
    responses: {
      '200': {
        description: 'Array of Customers has many Accounts',
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
    return this.customersRepository.accounts(id).find(filter);
  }

  @post('/customers/{id}/accounts', {
    responses: {
      '200': {
        description: 'Customers model instance',
        content: {'application/json': {schema: getModelSchemaRef(Accounts)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Customers.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Accounts, {
            title: 'NewAccountsInCustomers',
            exclude: ['id'],
            optional: ['customers_id']
          }),
        },
      },
    }) accounts: Omit<Accounts, 'id'>,
  ): Promise<Accounts> {
    return this.customersRepository.accounts(id).create(accounts);
  }

  @patch('/customers/{id}/accounts', {
    responses: {
      '200': {
        description: 'Customers.Accounts PATCH success count',
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
    return this.customersRepository.accounts(id).patch(accounts, where);
  }

  @del('/customers/{id}/accounts', {
    responses: {
      '200': {
        description: 'Customers.Accounts DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Accounts)) where?: Where<Accounts>,
  ): Promise<Count> {
    return this.customersRepository.accounts(id).delete(where);
  }
}
