INSERT INTO Banks (name, url_api) VALUES 
('Banco do Brasil', 'http://api.bancodobrasil.com'),
('Bradesco', 'http://api.bradesco.com');

INSERT INTO Customers (name, cpf, obs) VALUES
('John', '12345678912', NULL),
('Rennan', '98765432113', NULL);


INSERT INTO Agencies (number, description, banks_id) VALUES 
('1234', 'Conta corrente', 1),
('4321', 'Conta corrente', 2);

INSERT INTO Accounts (number, balance, agencies_id, customers_id) VALUES 
('123456', '100', 1, 1),
('654321', '1000', 2, 2);

INSERT INTO Transactions (date, type, amount, description, accounts_id) VALUES 
(NOW(), 'Retirada', 50, 'Pagamento', 1),
(NOW(), 'Entrada', 50, NULL, 2);

