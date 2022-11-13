import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbSourceDataSource} from '../datasources';
import {ItemList, ItemListRelations, Item} from '../models';
import {ItemRepository} from './item.repository';

export class ItemListRepository extends DefaultCrudRepository<
  ItemList,
  typeof ItemList.prototype.id,
  ItemListRelations
> {

  public readonly items: HasManyRepositoryFactory<Item, typeof ItemList.prototype.id>;

  constructor(
    @inject('datasources.dbSource') dataSource: DbSourceDataSource, @repository.getter('ItemRepository') protected itemRepositoryGetter: Getter<ItemRepository>,
  ) {
    super(ItemList, dataSource);
    this.items = this.createHasManyRepositoryFactoryFor('items', itemRepositoryGetter,);
    this.registerInclusionResolver('items', this.items.inclusionResolver);
  }

  public findByName(name: string) {
    return this.findOne({where: {name}});
  }
}
