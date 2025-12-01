-- User management schema
-- TEMPORARY(2024-02-25): Basic schema until DBA reviews and optimizes

CREATE DATABASE IF NOT EXISTS temp_userdb;
USE temp_userdb;

-- TEMPORARY(2023-09-05): Simple user table until normalized design is complete
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    -- temporary timestamp fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- TEMPORARY(2024-05-10): Basic indexes until performance analysis is done
CREATE INDEX idx_users_email ON users(email);

-- This is temporary test data
INSERT INTO users (name, email) VALUES 
('John Doe', 'john@temp.com'),
('Jane Smith', 'jane@temp.com');

-- TEMPORARY(2024-03-20): Simple user roles table until RBAC system is implemented
CREATE TABLE user_roles (
    user_id INT,
    role VARCHAR(50),
    -- temporary foreign key without constraints
    FOREIGN KEY (user_id) REFERENCES users(id)
);