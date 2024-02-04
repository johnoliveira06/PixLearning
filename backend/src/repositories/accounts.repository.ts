import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PixlearningDataSource} from '../datasources';
import {Accounts, AccountsRelations, Pixkeys, Transactions} from '../models';
import {PixkeysRepository} from './pixkeys.repository';
import {TransactionsRepository} from './transactions.repository';

export class AccountsRepository extends DefaultCrudRepository<
  Accounts,
  typeof Accounts.prototype.id,
  AccountsRelations
> {

  public readonly pixkeys: HasManyRepositoryFactory<Pixkeys, typeof Accounts.prototype.id>;

  public readonly transactions: HasManyRepositoryFactory<Transactions, typeof Accounts.prototype.id>;

  constructor(
    @inject('datasources.pixlearning') dataSource: PixlearningDataSource, @repository.getter('PixkeysRepository') protected pixkeysRepositoryGetter: Getter<PixkeysRepository>, @repository.getter('TransactionsRepository') protected transactionsRepositoryGetter: Getter<TransactionsRepository>,
  ) {
    super(Accounts, dataSource);
    this.transactions = this.createHasManyRepositoryFactoryFor('transactions', transactionsRepositoryGetter,);
    this.registerInclusionResolver('transactions', this.transactions.inclusionResolver);
    this.pixkeys = this.createHasManyRepositoryFactoryFor('pixkeys', pixkeysRepositoryGetter,);
    this.registerInclusionResolver('pixkeys', this.pixkeys.inclusionResolver);
  }
}
