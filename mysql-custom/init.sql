-- Criação da tabela users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  address VARCHAR(255),
  phone VARCHAR(50),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inserção dos dados reais em users
INSERT INTO users (id, name, address, phone, email, password, createdAt, updatedAt) VALUES
(1, 'carlos', '123', '11111111111', 'teste2@teste.com', '1234', '2025-04-09 09:44:21', '2025-04-09 09:44:21'),
(2, 'Carlos', 'Rua das Flores, 100', '11999999999', 'carlos@email.com', '$2b$10$kmiiIg9C0zlE5iDtNjwieec4xeE1uj.rd9EMMXOLeTlKfCa4O3f5G', '2025-04-09 12:55:24', '2025-04-09 12:55:24'),
(3, 'Carlos Roberto Ferreira Santos', 'Rua Glória', '11960907691', 'rep.csantos@gmail.com', '$2b$10$9tJvgOWhKPDJlPhGTqIwN.8ezlaPJqEcn5r4jLo9rMLNOpTR.V56G', '2025-04-09 15:33:05', '2025-04-09 19:57:02'),
(4, 'Luiz', 'Rua 123', '12111111111', 'tccmaridoaluguel1@gmail.com', '$2b$10$LK3bi8Ayb8O2z7eoMZgeEOKb5F7TOajKaAoCFl7Ku6KZOkVkhXVYG', '2025-04-09 22:56:42', '2025-04-09 22:58:34'),
(5, 'Teste Um', 'Rua da Fatec 21', '11222222222', 'teste3@teste.com', '$2b$10$dPcJO5WFaGYFE.HX4DgTf.grmYhtCRPx2SXDqUHMcQS5zGsvkx60i', '2025-04-10 14:46:37', '2025-04-10 14:48:47'),
(6, 'Verissimo', 'Rua frei joão 59', '11121212121', 'verissimo@teste.com', '$2b$10$ao52hEkZxmWd5saJBc/IselcN3tivB0aso6rFAbKiKIv8a4to76RO', '2025-04-16 00:11:46', '2025-04-16 00:11:46');

-- Criação da tabela prestadores
CREATE TABLE IF NOT EXISTS prestadores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  nome VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) NOT NULL,
  endereco_residencial VARCHAR(255) NOT NULL,
  endereco_comercial VARCHAR(255),
  telefone VARCHAR(20) NOT NULL,
  profissao VARCHAR(100) NOT NULL,
  empresa VARCHAR(255),
  data_entrada DATE,
  data_saida DATE,
  cnpj VARCHAR(18),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Inserção dos dados reais em prestadores
INSERT INTO prestadores (
  id, user_id, nome, cpf, endereco_residencial, endereco_comercial,
  telefone, profissao, empresa, data_entrada, data_saida, cnpj,
  criado_em, atualizado_em
) VALUES (
  1, 6, 'Verissimo', '12332112312', 'Rua frei joão 59', 'rua frei joão',
  '11121212121', 'professor', 'fatec', '2025-04-01', '2025-04-15', '123321123312',
  '2025-04-15 23:27:27', '2025-04-15 23:27:27'
);
