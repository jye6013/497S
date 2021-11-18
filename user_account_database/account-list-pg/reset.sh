#! /bin/bash
# A script to create or reset the docker image/container.

# Remove everything that we may have created before
docker stop postgres-accountlist-db-container
docker rm postgres-accountlist-db-container
docker image rm postgres-movielist-db

rm -fr postgres-accountlist-data/*

docker build -t postgres-accountlist-db .

docker run -d \
    --name postgres-accountlist-db-container \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_PASSWORD=123456 \
    -v $(pwd)/postgres-accountlist-data/:/var/lib/postgresql/data \
    -p 5432:5432 \
    postgres-accountlist-db
