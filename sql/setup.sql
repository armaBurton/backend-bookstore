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

INSERT INTO 
publishers (name, city, state, country)
VALUES
('Tor Books', 'New York City', 'New York', 'USA'),
('Penguin Random House Company', 'New York City', 'New York', 'USA');

CREATE TABLE authors (
    author_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    date_of_birth DATE,
    place_of_birth TEXT
);

INSERT INTO
authors (name, date_of_birth, place_of_birth)
VALUES
('John Steinback', '1953-11-12', 'Salinas, CA' ),
('Neal Town Stephenson', '1959-10-31', 'Fort Meade, MD');


CREATE TABLE books (
    book_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    publisher_id BIGINT NOT NULL,
    review_id BIGINT,
    title TEXT NOT NULL,
    released INT NOT NULL
);

INSERT INTO
books (title, released, publisher_id, review_id)
VALUES
('Mice and Men', 1937, 1, 1),
('The Diamond Age: Or, A Young Lady''s Illustrated Primer',  1995, 2, 2);


CREATE TABLE reviews (
    review_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    reviewer_id BIGINT NOT NULL,
    review_text CHAR(140) NOT NULL,
    rating INT NOT NULL,
    book_id BIGINT NOT NULL
);

INSERT INTO
reviews (reviewer_id, review_text, rating, book_id)
VALUES
(1, 'Whether it is Snapchat, Twitter, Facebook, Yelp or just a note to co-workers or business officials, the number of actual characters matters.', 5, 1),
(2, 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ma', 4, 2);

CREATE TABLE reviewers (
    reviewer_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT NOT NULL

);

INSERT INTO
reviewers (name, company)
VALUES
('Yon Yonson', 'Ratty Comic Books'),
('Betsy Bonsei', 'TV Guide Dinner Reviews');


CREATE TABLE author_book (
    book_id BIGINT REFERENCES books(book_id),
    author_id BIGINT REFERENCES authors(author_id)
);

-- INSERT INTO
-- author_book (book_id, author_id)
-- VALUES
-- ()