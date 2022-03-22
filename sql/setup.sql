-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS publisher CASCADE;
DROP TABLE IF EXISTS author CASCADE;
DROP TABLE IF EXISTS book CASCADE;
DROP TABLE IF EXISTS review CASCADE;
DROP TABLE IF EXISTS reviewer CASCADE;
DROP TABLE IF EXISTS author_book CASCADE;


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

CREATE TABLE author (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    place_of_birth TEXT NOT NULL
);

INSERT INTO
author (name, date_of_birth, place_of_birth)
VALUES
('John Steinback', '1953-11-12', 'Salinas, CA' ),
('Neal Town Stephenson', '1959-10-31', 'Fort Meade, MD');


CREATE TABLE book (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    publisher_id BIGINT NOT NULL,
    book_id BIGINT NOT NULL,
    review_id BIGINT,
    title TEXT NOT NULL,
    released INT NOT NULL
);

INSERT INTO
book (title, released, publisher_id, book_id, review_id)
VALUES
('Mice and Men', 1937, 1, 1, 1),
('The Diamond Age: Or, A Young Lady''s Illustrated Primer',  1995, 2, 2, 2);


CREATE TABLE review (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review_id BIGINT NOT NULL,
    reviewer_id BIGINT NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL
);

INSERT INTO
review (review_id, reviewer_id, review, rating)
VALUES
(1, 1, 'this is a review', 5),
(2, 2, 'Flank ham shankle, pork belly shank filet mignon pig tongue. Flank leberkas turducken, cupim filet mignon jerky beef ribs bresaola meatloaf tri-tip t-bone. Prosciutto porchetta filet mignon chuck meatloaf, beef ribs turkey alcatra pastrami ribeye. Jerky spare ribs ham hock, hamburger pork chop short ribs jowl leberkas corned beef. Alcatra beef chislic bresaola chicken. Meatloaf salami prosciutto brisket turkey. Flank pig ham hock sirloin, corned beef andouille picanha fatback ground round porchetta.', 4);

CREATE TABLE reviewer (
    reviewer_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT NOT NULL

);

INSERT INTO
reviewer (name, company)
VALUES
('Yon Yonson', 'Ratty Comic Books'),
('Betsy Bonsei', 'TV Guide Dinner Reviews');


CREATE TABLE author_book (
    book_id BIGINT REFERENCES book(id),
    author_id BIGINT REFERENCES author(id)
);

-- INSERT INTO
-- author_book (book_id, author_id)
-- VALUES
-- ()