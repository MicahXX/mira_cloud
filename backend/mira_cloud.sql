CREATE DATABASE mira_cloud;

use mira_cloud;

CREATE TABLE users (
                       username VARCHAR(255) NOT NULL PRIMARY KEY,
                       pass VARCHAR(255) NOT NULL
);

select * from users;