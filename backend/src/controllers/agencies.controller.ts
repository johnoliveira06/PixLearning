import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Agencies} from '../models';
import {AgenciesRepository} from '../repositories';

export class AgenciesController {
  constructor(
    @repository(AgenciesRepository)
    public agenciesRepository : AgenciesRepository,
  ) {}

  @post('/agencies')
  @response(200, {
    description: 'Agencies model instance',
    content: {'application/json': {schema: getModelSchemaRef(Agencies)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agencies, {
            title: 'NewAgencies',
            exclude: ['id'],
          }),
        },
      },
    })
    agencies: Omit<Agencies, 'id'>,
  ): Promise<Agencies> {
    return this.agenciesRepository.create(agencies);
  }

  @get('/agencies/count')
  @response(200, {
    description: 'Agencies model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Agencies) where?: Where<Agencies>,
  ): Promise<Count> {
    return this.agenciesRepository.count(where);
  }

  @get('/agencies')
  @response(200, {
    description: 'Array of Agencies model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Agencies, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Agencies) filter?: Filter<Agencies>,
  ): Promise<Agencies[]> {
    return this.agenciesRepository.find(filter);
  }

  @patch('/agencies')
  @response(200, {
    description: 'Agencies PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agencies, {partial: true}),
        },
      },
    })
    agencies: Agencies,
    @param.where(Agencies) where?: Where<Agencies>,
  ): Promise<Count> {
    return this.agenciesRepository.updateAll(agencies, where);
  }

  @get('/agencies/{id}')
  @response(200, {
    description: 'Agencies model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Agencies, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Agencies, {exclude: 'where'}) filter?: FilterExcludingWhere<Agencies>
  ): Promise<Agencies> {
    return this.agenciesRepository.findById(id, filter);
  }

  @patch('/agencies/{id}')
  @response(204, {
    description: 'Agencies PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agencies, {partial: true}),
        },
      },
    })
    agencies: Agencies,
  ): Promise<void> {
    await this.agenciesRepository.updateById(id, agencies);
  }

  @put('/agencies/{id}')
  @response(204, {
    description: 'Agencies PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() agencies: Agencies,
  ): Promise<void> {
    await this.agenciesRepository.replaceById(id, agencies);
  }

  @del('/agencies/{id}')
  @response(204, {
    description: 'Agencies DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.agenciesRepository.deleteById(id);
  }
}
