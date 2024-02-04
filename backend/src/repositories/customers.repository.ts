import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PixlearningDataSource} from '../datasources';
import {Customers, CustomersRelations, Accounts} from '../models';
import {AccountsRepository} from './accounts.repository';

export class CustomersRepository extends DefaultCrudRepository<
  Customers,
  typeof Customers.prototype.id,
  CustomersRelations
> {

  public readonly accounts: HasManyRepositoryFactory<Accounts, typeof Customers.prototype.id>;

  constructor(
    @inject('datasources.pixlearning') dataSource: PixlearningDataSource, @repository.getter('AccountsRepository') protected accountsRepositoryGetter: Getter<AccountsRepository>,
  ) {
    super(Customers, dataSource);
    this.accounts = this.createHasManyRepositoryFactoryFor('accounts', accountsRepositoryGetter,);
    this.registerInclusionResolver('accounts', this.accounts.inclusionResolver);
  }
}
