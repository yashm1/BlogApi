CREATE DATABASE blogs;

CREATE TABLE blogs_data(
    blog_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    body TEXT
);