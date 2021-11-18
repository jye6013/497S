CREATE TABLE IF NOT EXISTS userlist (id varchar(8), movie_id varchar(8), title varchar(255), description varchar(255));

INSERT INTO userlist (id, movie_id, title, description)
    VALUES ('1', '1', 'arcane', 'league of legends film'),
           ('2', '2', 'squid game', '2nd film on netflix');
