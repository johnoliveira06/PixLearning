import {BackendApplication} from './application';
import {BanksRepository} from './repositories';
import {Banks} from './models';
import {CustomersRepository} from './repositories';
import {Customers} from './models';
import {AgenciesRepository} from './repositories';
import {Agencies} from './models';
import {AccountsRepository} from './repositories/accounts.repository';
import {Accounts} from './models/accounts.model';

export async function migrate(args: string[]) {
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  const app = new BackendApplication();
  await app.boot();
  await app.migrateSchema({
    existingSchema,
    models: [
      'Banks',
      'Customers',
      'Agencies',
      'Accounts',
      'Pixkeys',
      'Transactions',
    ],
  });

  const BanksRepo = await app.getRepository(BanksRepository);
  const banksData = [
    {
      name: 'Banco do Brasil',
      url_api: 'https://api.bancodobrasil.com',
    },
    {
      name: 'Bradesco',
      url_api: 'https://api.bradesco.com',
    },
  ];

  for (const bankData of banksData) {
    const bank = new Banks(bankData);
    await BanksRepo.create(bank);
  }
  const CustomersRepo = await app.getRepository(CustomersRepository);
  const customersData = [
    {
      name: 'John',
      cpf: '12345678912',
      obs: '',
    },
    {
      name: 'Rennan',
      cpf: '98765432121',
      obs: '',
    },
  ];

  for (const customerData of customersData) {
    const customer = new Customers(customerData);
    await CustomersRepo.create(customer);
  }

  const AgenciesRepo = await app.getRepository(AgenciesRepository);
  const agenciesData = [
    {
      number: '1234',
      description: 'Agência Banco do Brasil',
      banks_id: 1,
    },
    {
      number: '4321',
      description: 'Agência Bradesco',
      banks_id: 2,
    },
  ];

  for (const agencyData of agenciesData) {
    const agency = new Agencies(agencyData);
    await AgenciesRepo.create(agency);
  }

  const AccountsRepo = await app.getRepository(AccountsRepository);
  const accountsData = [
    {
      number: '123456',
      password: '789',
      balance: 100,
      agencies_id: 1,
      customers_id: 1,
    },
    {
      number: '654321',
      password: '987',
      balance: 1000,
      agencies_id: 2,
      customers_id: 2,
    },
  ];

  for (const accountData of accountsData) {
    const account = new Accounts(accountData);
    await AccountsRepo.create(account);
  }

  // Connectors usually keep a pool of opened connections,
  // this keeps the process running even after all work is done.
  // We need to exit explicitly.
  process.exit(0);
}

migrate(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err);
  process.exit(1);
});
