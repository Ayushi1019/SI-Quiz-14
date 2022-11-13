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
import {ItemList} from '../models';
import {ItemListRepository} from '../repositories';

export class ItemListController {
  constructor(
    @repository(ItemListRepository)
    public itemListRepository : ItemListRepository,
  ) {}

  @post('/item-lists')
  @response(200, {
    description: 'ItemList model instance',
    content: {'application/json': {schema: getModelSchemaRef(ItemList)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemList, {
            title: 'NewItemList',
            
          }),
        },
      },
    })
    itemList: ItemList,
  ): Promise<ItemList> {
    return this.itemListRepository.create(itemList);
  }

  @get('/item-lists/count')
  @response(200, {
    description: 'ItemList model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ItemList) where?: Where<ItemList>,
  ): Promise<Count> {
    return this.itemListRepository.count(where);
  }

  @get('/item-lists')
  @response(200, {
    description: 'Array of ItemList model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ItemList, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ItemList) filter?: Filter<ItemList>,
  ): Promise<ItemList[]> {
    return this.itemListRepository.find(filter);
  }

  @patch('/item-lists')
  @response(200, {
    description: 'ItemList PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemList, {partial: true}),
        },
      },
    })
    itemList: ItemList,
    @param.where(ItemList) where?: Where<ItemList>,
  ): Promise<Count> {
    return this.itemListRepository.updateAll(itemList, where);
  }

  @get('/item-lists/{id}')
  @response(200, {
    description: 'ItemList model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ItemList, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ItemList, {exclude: 'where'}) filter?: FilterExcludingWhere<ItemList>
  ): Promise<ItemList> {
    return this.itemListRepository.findById(id, filter);
  }

  @patch('/item-lists/{id}')
  @response(204, {
    description: 'ItemList PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemList, {partial: true}),
        },
      },
    })
    itemList: ItemList,
  ): Promise<void> {
    await this.itemListRepository.updateById(id, itemList);
  }

  @put('/item-lists/{id}')
  @response(204, {
    description: 'ItemList PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() itemList: ItemList,
  ): Promise<void> {
    await this.itemListRepository.replaceById(id, itemList);
  }

  @del('/item-lists/{id}')
  @response(204, {
    description: 'ItemList DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.itemListRepository.deleteById(id);
  }
}
