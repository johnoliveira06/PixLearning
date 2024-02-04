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
import {Pixkeys} from '../models';
import {PixkeysRepository} from '../repositories';

export class PixkeysController {
  constructor(
    @repository(PixkeysRepository)
    public pixkeysRepository : PixkeysRepository,
  ) {}

  @post('/pixkeys')
  @response(200, {
    description: 'Pixkeys model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pixkeys)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pixkeys, {
            title: 'NewPixkeys',
            exclude: ['id'],
          }),
        },
      },
    })
    pixkeys: Omit<Pixkeys, 'id'>,
  ): Promise<Pixkeys> {
    return this.pixkeysRepository.create(pixkeys);
  }

  @get('/pixkeys/count')
  @response(200, {
    description: 'Pixkeys model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pixkeys) where?: Where<Pixkeys>,
  ): Promise<Count> {
    return this.pixkeysRepository.count(where);
  }

  @get('/pixkeys')
  @response(200, {
    description: 'Array of Pixkeys model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pixkeys, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pixkeys) filter?: Filter<Pixkeys>,
  ): Promise<Pixkeys[]> {
    return this.pixkeysRepository.find(filter);
  }

  @patch('/pixkeys')
  @response(200, {
    description: 'Pixkeys PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pixkeys, {partial: true}),
        },
      },
    })
    pixkeys: Pixkeys,
    @param.where(Pixkeys) where?: Where<Pixkeys>,
  ): Promise<Count> {
    return this.pixkeysRepository.updateAll(pixkeys, where);
  }

  @get('/pixkeys/{id}')
  @response(200, {
    description: 'Pixkeys model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pixkeys, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pixkeys, {exclude: 'where'}) filter?: FilterExcludingWhere<Pixkeys>
  ): Promise<Pixkeys> {
    return this.pixkeysRepository.findById(id, filter);
  }

  @patch('/pixkeys/{id}')
  @response(204, {
    description: 'Pixkeys PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pixkeys, {partial: true}),
        },
      },
    })
    pixkeys: Pixkeys,
  ): Promise<void> {
    await this.pixkeysRepository.updateById(id, pixkeys);
  }

  @put('/pixkeys/{id}')
  @response(204, {
    description: 'Pixkeys PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pixkeys: Pixkeys,
  ): Promise<void> {
    await this.pixkeysRepository.replaceById(id, pixkeys);
  }

  @del('/pixkeys/{id}')
  @response(204, {
    description: 'Pixkeys DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pixkeysRepository.deleteById(id);
  }
}
