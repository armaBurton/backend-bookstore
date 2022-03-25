-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS publishers CASCADE;
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS reviewers CASCADE;
DROP TABLE IF EXISTS author_book CASCADE;


CREATE TABLE publishers (
    publisher_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT,
    state TEXT,
    country TEXT
);

CREATE TABLE books (
    book_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    publisher_id BIGINT REFERENCES publishers(publisher_id) NOT NULL,
    -- review_id BIGINT REFERENCES reviews(review_id),
    title TEXT NOT NULL,
    released INT NOT NULL
);

CREATE TABLE author_book (
    author_book_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    book_id BIGINT REFERENCES books(book_id)
);

CREATE TABLE authors (
    author_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    author_book_id BIGINT REFERENCES author_book(author_book_id),
    name TEXT NOT NULL,
    date_of_birth DATE,
    place_of_birth TEXT
);

CREATE TABLE reviews (
    review_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_text CHAR(140) NOT NULL,
    rating INT NOT NULL,
    book_id BIGINT REFERENCES books(book_id) NOT NULL
);

CREATE TABLE reviewers (
    reviewer_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id BIGINT REFERENCES reviews(review_id),
    name TEXT NOT NULL,
    company TEXT NOT NULL
);

INSERT INTO
publishers (name, city, state, country)
VALUES
('Tor Books', 'New York City', 'New York', 'USA'),
('Penguin Random House Company', 'New York City', 'New York', 'USA'),
('Dark Horse Comics', 'Portland', 'Oregon', 'USA');

INSERT INTO
books (title, released, publisher_id)
VALUES
('Mice and Men', 1937, 1),
('The Diamond Age: Or, A Young Lady''s Illustrated Primer',  1995, 2),
('Savage Hearts',  2022, 3);

INSERT INTO author_book(book_id)
VALUES (1), (2), (3);

INSERT INTO
authors (author_book_id, name, date_of_birth, place_of_birth)
VALUES
(1, 'John Steinback', '1953-11-12', 'Salinas, CA' ),
(2, 'Neal Town Stephenson', '1959-10-31', 'Fort Meade, MD'),
(3, 'Aubrey Sitterson', '1973-05-13', 'Monkey Island, RI'),
(3, 'Dinosaur Jim', '1825-09-09', 'Hot Lava, WY');

INSERT INTO
reviews (review_text, rating, book_id)
VALUES
('Whether it is Snapchat, Twitter, Facebook, Yelp or just a note to co-workers or business officials, the number of actual characters matters.', 5, 1),
('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ma', 4, 2),
('It was okay, Nothing to write about', 2, 3);

INSERT INTO
reviewers (review_id, name, company)
VALUES
(1, 'Yon Yonson', 'Ratty Comic Books'),
(3, 'Yon Yonson', 'Ratty Comic Books'),
(2, 'Betsy Bonsei', 'TV Guide Dinner Reviews');


