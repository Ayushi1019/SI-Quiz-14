import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Item,
  ItemList,
} from '../models';
import {ItemRepository} from '../repositories';

export class ItemItemListController {
  constructor(
    @repository(ItemRepository)
    public itemRepository: ItemRepository,
  ) { }

  @get('/items/{id}/item-list', {
    responses: {
      '200': {
        description: 'ItemList belonging to Item',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ItemList)},
          },
        },
      },
    },
  })
  async getItemList(
    @param.path.number('id') id: typeof Item.prototype.id,
  ): Promise<ItemList> {
    return this.itemRepository.itemList(id);
  }
}
