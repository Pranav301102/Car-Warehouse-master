-- Create DATABASE
CREATE DATABASE car_warehouse;

-- Create cars table 
CREATE TABLE IF NOT EXISTS cars (
	id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    model VARCHAR(100) NOT NULL,
    color VARCHAR(50) NOT NULL,
    quantity INT NOT NULL
);

-- Insert values to cars table
INSERT INTO cars (model, color, quantity)
VALUES ('Toyota Camry', 'Silver', 5);

INSERT INTO cars (model, color, quantity) 
VALUES ('Honda Civic', 'Black', 3);
