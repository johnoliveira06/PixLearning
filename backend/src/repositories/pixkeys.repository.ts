import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PixlearningDataSource} from '../datasources';
import {Pixkeys, PixkeysRelations} from '../models';

export class PixkeysRepository extends DefaultCrudRepository<
  Pixkeys,
  typeof Pixkeys.prototype.id,
  PixkeysRelations
> {
  constructor(
    @inject('datasources.pixlearning') dataSource: PixlearningDataSource,
  ) {
    super(Pixkeys, dataSource);
  }
}
