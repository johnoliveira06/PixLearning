## ℹ️ Sobre o projeto

Este projeto consiste na demonstração de uma transação de dados, utilizando como exemplo a transferência bancária de fundos de um banco para outro.

---

### 🎲 Inicializando o projeto

- Para executar este projeto, é necessário ter as seguintes instalações:

  - MySQL (XAMPP, MySQL Workbench, etc.);
  - NodeJs;
  - npm.

    <br/>

- **Clone este repositório:**
  ```shell
  git clone https://github.com/johnoliveira06/PixLearning.git
  ```
- **Acesse o diretório do projeto:**
  ```shell
  cd PixLearning
  ```
- **Instale as dependências (diretório backend):**

  ```shell
  cd backend

  npm install
  ```

- **Instale as dependências (diretório frontend):**

  ```shell
  cd frontend

  npm install
  ```

- **Crie seu banco de dados manualmente no seu servidor MySQL**

- **Em seguida, modifique o arquivo `mysql.datasources.ts`, localizado no diretório `backend/src/datasources`, com as credenciais do seu servidor MySQL e o nome do seu banco de dados:**

  ```Javascript
  const config = {
  name: 'mysql',
  connector: 'mysql',
  url: '',
  host: 'localhost', // Altere para o host do seu banco de dados
  port: 3306, // Altere para a porta do seu banco de dados
  user: 'root', // Altere para seu nome de usuário do banco de dados
  password: '', // Senha do seu banco de dados
  database: 'pixlearning' // Altere para o nome do seu banco de dados criado anteriormente
  };

  ```

- **Após a etapa anterior, execute o seguinte comando para importar as tabelas para o seu banco de dados:**

  ```shell
  npm run migrate
  ```

<!-- - **Execute o script SQL `populate.sql`, localizado no diretório `documents` para inserir os dados** -->

- **Inicie o backend:**

  ```shell
  cd PixLearning/backend/

  npm start
  ```

- **Inicie o frontend:**

  ```shell
  cd PixLearning/frontend/

  npm run dev
  ```

---

- **Dados para a realização de testes:**

  | Bancos          | Agências | Contas |
  | --------------- | -------- | ------ |
  | Banco do Brasil | 1234     | 123456 |
  | Bradesco        | 4321     | 654321 |
