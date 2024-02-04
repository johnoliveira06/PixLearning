import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PixlearningDataSource} from '../datasources';
import {Agencies, AgenciesRelations, Accounts} from '../models';
import {AccountsRepository} from './accounts.repository';

export class AgenciesRepository extends DefaultCrudRepository<
  Agencies,
  typeof Agencies.prototype.id,
  AgenciesRelations
> {

  public readonly accounts: HasManyRepositoryFactory<Accounts, typeof Agencies.prototype.id>;

  constructor(
    @inject('datasources.pixlearning') dataSource: PixlearningDataSource, @repository.getter('AccountsRepository') protected accountsRepositoryGetter: Getter<AccountsRepository>,
  ) {
    super(Agencies, dataSource);
    this.accounts = this.createHasManyRepositoryFactoryFor('accounts', accountsRepositoryGetter,);
    this.registerInclusionResolver('accounts', this.accounts.inclusionResolver);
  }
}
