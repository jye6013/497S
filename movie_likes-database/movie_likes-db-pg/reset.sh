#! /bin/bash

docker stop postgres-movie_likes-db-container
docker rm postgres-movie_likes-db-container
docker image rm postgres-movie_likes-db

rm -fr postgres-data/*

docker built -t postgres-movie_likes-db .

docker run -d \
    --name postgres-movie_likes-db-container \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_PASSWORD=postgres \
    -v $(pwd)/postgres-data/:/var/lib/postgresql/data \
    -p 5433:5433 \
    postgres-movie_likes-db