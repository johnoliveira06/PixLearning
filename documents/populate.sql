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
(NOW(), 'Saída', 50, 'Pagamento', 1),
(NOW(), 'Entrada', 50, NULL, 2);

DELIMITER //

CREATE PROCEDURE transferencia(transfer_value DECIMAL(10,2))
BEGIN
    DECLARE original_balance DECIMAL(10,2);
    DECLARE rollback_message VARCHAR(255) DEFAULT 'Saldo insuficiente para transferência';
    DECLARE commit_message VARCHAR(255) DEFAULT 'Transferência realizada com sucesso!';
    
    START TRANSACTION;

    SELECT balance INTO original_balance FROM Accounts WHERE customers_id = 1 FOR UPDATE;
    
    IF original_balance >= transfer_value THEN
        UPDATE Accounts SET balance = original_balance - transfer_value WHERE customers_id = 1;
        UPDATE Accounts SET balance = balance + transfer_value WHERE customers_id = 2;
        INSERT INTO Transactions (date, type, amount, description, accounts_id) VALUES (NOW(), 'Saída', transfer_value, NULL, 1);
        INSERT INTO Transactions (date, type, amount, description, accounts_id) VALUES (NOW(), 'Entrada', transfer_value, NULL, 2);
    ELSE
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = rollback_message;
    END IF;

    COMMIT;
    SELECT commit_message as 'Resultado';
END// 

DELIMITER ;