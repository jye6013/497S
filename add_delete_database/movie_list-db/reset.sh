#! /bin/bash
# A script to create or reset the docker image/container.

# Remove everything that we may have created before
docker stop postgres-movielist-db-container
docker rm postgres-movielist-db-container
docker image rm postgres-movielist-db

rm -fr postgres-movielist-data/*

docker build -t postgres-movielist-db .

docker run -d \
    --name postgres-movielist-db-container \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_PASSWORD=postgres \
    -v $(pwd)/postgres-movielist-data/:/var/lib/postgresql/data \
    -p 5432:5432 \
    postgres-movielist-db
