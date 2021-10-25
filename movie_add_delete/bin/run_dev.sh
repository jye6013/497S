#! /bin/bash
docker run --rm --name my_node_server_1_dev -v "$(pwd)/.:/usr/src/app" -p 5000:5000 node_server_1_dev