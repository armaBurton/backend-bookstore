-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS publisher;


CREATE TABLE publisher (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL
);

INSERT INTO 
publisher (name, city, country)
VALUES
('Tor Books', 'New York City', 'USA'),
('Penguin Random House Company', 'New York City', 'USA');