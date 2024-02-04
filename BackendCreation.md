## ⌨️ Comandos utilizados para criação do backend:

- **Instale o Loopback 4:**

  ```shell
  npm i -g @loopback/cli
  ```

- **Crie um projeto:**

  ```shell
  lb4 app
  ```

  Responda as instruções:

  ```shell
  ? Nome do projeto: NomeDoProjeto
  ```

  Após definir o nome do projeto apenas pressione Enter

  ```shell
  ? Descrição do projeto: NomeDoProjeto
  ? Diretório-raiz do projeto: NomeDoProjeto
  ? Nome da classe do aplicativo: NomeDoProjetoApplication
  ? Selecionar recursos para ativar no projeto (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
  ❯◉ Ativar eslint: Incluir um linter com regras de lint pré-configuradas
  ◉ Ativar prettier: Instalar Prettier para formatar código em conformidade com as regras
  ◉ Ativar mocha: Instale o mocha para executar testes
  ◉ Ativar loopbackBuild: use os auxiliares @loopback/build (por exemplo, lb-eslint)
  ◉ Ativar vscode: Inclua arquivos de configuração de VSCode
  ◉ Ativar docker: Incluir Dockerfile e .dockerignore
  ◉ Ativar repositories: Incluir importações de repositório e o RepositoryMixin
  ```

- **Escolha o seu banco de dados:**

  ```shell
  cd NomeDoProjeto

  lb4 datasource
  ```

  Responda as instruções:

  ```shell
  ? Datasource nome: MySql
  ? Selecione o conector para MySql:
  gRPC (supported by StrongLoop)
  Redis key-value connector (supported by StrongLoop)
  MongoDB (supported by StrongLoop)
  ❯ MySQL (supported by StrongLoop)
  PostgreSQL (supported by StrongLoop)
  Oracle (supported by StrongLoop)
  Microsoft SQL (supported by StrongLoop)
  ```

  Configurações do MySQL:

  ```shell
  ? Connection String url to override other settings (eg: mysql://user:pass@host/db):
  ? host: localhost
  ? port: 3306
  ? user: root
  ? password: [hidden] //Apenas dê Enter
  ? database: database //Nome da sua base de dados
  ```

- **Crie suas tabelas do banco de dados:**

  ```shell
  lb4 model
  ```

  Responda as instruções:

  ```shell
  ? Nome da classe Model: pessoa
  ? Selecione a classe base do modelo (Use arrow keys)
  ❯ Entity (A persisted model with an ID)
  Model (A business domain object)
  ```

  ```shell
  ? Permitir propriedades adicionais (formato livre)? No
  Model Pessoa será criado em src/models/pessoa.model.ts

    Vamos incluir uma propriedade em Pessoa
    Insira um nome de propriedade vazio quando estiver pronto

    ? Insira o nome da propriedade: id
    ? Tipo de propriedade: number
    ? A propriedade de ID é id? Yes
    ? O id é gerado automaticamente? Yes

    Vamos incluir outra propriedade em Pessoa
    Insira um nome de propriedade vazio quando estiver pronto

    ? Insira o nome da propriedade: nome
    ? Tipo de propriedade: string
    ? É necessário? Yes
  ```

- **Crie os repositórios para as tabelas:**

  ```shell
  lb4 repository
  ```

  Pressione a tecla "a" e dê Enter:

  ```shell
  ? Select the datasource MySqlDatasource
  ? Selecione os modelos para os quais deseja gerar um repositório (Press <space> to select, <a> to toggle all, <i> to invert selection, and
  <enter> to proceed)
  ❯◉ Pessoa
  ```

  - **Crie os controladores da sua aplicação (Cada um para suas respectivas tabelas):**

  ```shell
  lb4 controller
  ```

  ```shell
  ? Nome da classe Controller: pessoa
  Controller Pessoa será criado em src/controllers/pessoa.controller.ts

  ? Que tipo de controlador você gostaria de gerar?
  Controlador vazio
  ❯ Controlador de REST com funções de CRUD

  ? Qual é o nome do modelo a ser usado com este repositório CRUD? Pessoa
  ? Qual é o nome do repositório CRUD? PessoaRepository
  ? Qual é o nome da propriedade de ID? id
  ? Qual é o tipo do seu ID? number
  ? O ID será omitido ao criar uma nova instância? Yes
  ? Qual é o nome do caminho HTTP base das operações CRUD? /pessoas
  ```
