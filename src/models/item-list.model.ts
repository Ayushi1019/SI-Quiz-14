import {Entity, model, property, hasMany} from '@loopback/repository';
import {Item} from './item.model';

@model()
export class ItemList extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  price: string;

  @property({
    type: 'string',
  })
  description?: string;

  @hasMany(() => Item)
  items: Item[];

  constructor(data?: Partial<ItemList>) {
    super(data);
  }
}

export interface ItemListRelations {
  // describe navigational properties here
}

export type ItemListWithRelations = ItemList & ItemListRelations;
