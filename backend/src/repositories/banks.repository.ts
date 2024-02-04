import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PixlearningDataSource} from '../datasources';
import {Banks, BanksRelations, Agencies} from '../models';
import {AgenciesRepository} from './agencies.repository';

export class BanksRepository extends DefaultCrudRepository<
  Banks,
  typeof Banks.prototype.id,
  BanksRelations
> {

  public readonly agencies: HasManyRepositoryFactory<Agencies, typeof Banks.prototype.id>;

  constructor(
    @inject('datasources.pixlearning') dataSource: PixlearningDataSource, @repository.getter('AgenciesRepository') protected agenciesRepositoryGetter: Getter<AgenciesRepository>,
  ) {
    super(Banks, dataSource);
    this.agencies = this.createHasManyRepositoryFactoryFor('agencies', agenciesRepositoryGetter,);
    this.registerInclusionResolver('agencies', this.agencies.inclusionResolver);
  }
}
