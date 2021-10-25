# Creating an API App in Docker

This is a short example on how to create a Node HTTP app server using Express and Docker.

# Prerequisites

1. This activity assumes you already have Docker installed and have tested to make sure it works.
2. You know how to use the command line on your platform (e.g., Linux, Mac, Windows).
3. You have already seen how to run the default Nginx container.
4. You have already seen how to use volumes.
5. You have already seen how to create a custom Docker image.
5. You are not afraid to explore!

# Overview

There are so many ways to create HTTP servers in a variety of programming languages. This example will use the JavaScript language and the [Express](https://expressjs.com) package to demonstrate how to write a *very* simple API server that runs inside of docker. We will be using [NPM](https://www.npmjs.com) which is a Node.js project management tool.

**Note:** you will need to have a recent version of [Node.js](https://nodejs.org) installed and NPM installed to work with this example.

# Step 1: Initializing the NPM project

First, create a directory named `node_api_server_1`. Then, from the command line run `npm init`. This will prompt you with various questions that you will either need to answer and pick the default. After you do this a `package.json` file will be generated with your configuration information. Here is an example of our `package.json`:

```
{
  "name": "node_api_server_1",
  "version": "1.0.0",
  "description": "A simple API server",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
  },
  "author": "Tim Richards",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

# Step 2: Install dependencies

This example will use Express to write a basic API server. We will need to install this package. This is how you do it using NPM:

```
$ npm install express
```

You will see output that indicates that express has been installed. You will also notice that it updated your `package.json` file to include this dependency. In addition, you will notice that a `package-lock.json` file was also generated. This file is used to "lock" the dependency versions to ensure that if you build/run the application on another system it uses *exactly* the version of the installed packages that you used. You should not delete this file and it should be included in a Git repository.

You will also notice that a `node_modules` directory was produced. This is where all of the installed libraries go. You do not need to touch this and it should be added to your `.gitignore` file if you are using Git.

# Step 3: A Simple API Server

Next, we want to write a simple API server in JavaScript using Express. Create a new file in the root of your project folder called `main.js`. First, we require the express package we are going to use:

```js
const express = require('express')
```

Next, we create the application object and indicate the port number:

```js
const app = express()
const port = 5000
```

Now, we write a route that will return some simple JSON when the root is requested:

```js
app.get('/', (req, res) => {
    res.send({ 'Hello': 'World' })
})
```

The `get()` method on the app will be invoked when an HTTP GET request is received. If the request matches the `/` route, it will invoke the anonymous function and send back as a response the JS object, which will automatically be converted into JSON.

Here is another route to make it more interesting:

```js
app.get('/item/:item_id', (req, res) => {
    res.send({
        'item_id': req.params.item_id,
        'q': req.query.q === undefined ? null : req.query.q
    })
})
```

This route will be invoked when the URL path matches the route pattern that is specified. The pattern is a path starting with `/item/` followed by a variable indicated by `:item_id`. The route handler function will send back a JSON object containing the `item_id` value that was indicated in the path and the value of the query variable `q` if it was specified as part of the URL, otherwise it simply returns null.

Lastly, we run the server on the specified port and allow incoming requests from any host:

```js
app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
```

Here is the complete program:

```js
const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.send({ 'Hello': 'World' })
})

app.get('/item/:item_id', (req, res) => {
    res.send({
        'item_id': req.params.item_id,
        'q': req.query.q === undefined ? null : req.query.q
    })
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
```

# Step 4: Test the application on your computer

Now that we have packages installed and a basic API server, let us test it out. To do this we need to run `node` with our code we wrote in `main.js`. This is quite simple:

```
node main.js
```

You will see output that looks like this when you run the command above:

```
Example app listening at http://localhost:5000
```

Now, you can visit [http://localhost:5000](http://localhost:5000) in your browser of choice and interact with the server. Type C-c in the terminal to exit the server.

To make life easier, we can create shortcuts in NPM to have it run complicated commands for us. Open up the `package.json` file and add this to the *scripts* section:

```
"start_server": "node main.js",
```

Now, we can run this command in a shorter form like this:

```
$ npm run start_server
```

# Step 5: Create a Dockerfile to run the app in Docker

We now want to build a Docker image that will allow us to run our application entirely in a container. The basic idea is to use an officially supported [Node Docker image from DockerHub](https://hub.docker.com/_/node), copy NPM configuration files into the image, install Node packages using NPM, and indicate how to run the server. Let us look at this step-by-step.

Create a new file in the root of this project called `Dockerfile`. The first line of this file is:

```
FROM node
```

This is the official Docker image we will build from. Next, we will set a working directory (similar to the `cd` command), which is where our application will live.

```
WORKDIR /usr/src/app
```

Now, we copy the NPM files that will allow us to install the required Node libraries and then install them with NPM:

```
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
```

Lastly, we copy our `main.js` file into the image, export port 5000 in the container to allow HTTP communication to come in from outside the container, and indicate the command to run to start the server.

```
COPY ./main.js ./main.js
EXPOSE 5000
CMD ["npm", "run", "start_server"]
```

Note that we use our "shortcut" to start the server using NPM.

Here is the complete `Dockerfile`:

```
# pull the Node Docker image
FROM node

# Create the directory inside the container for the app
WORKDIR /usr/src/app

# Copy configuration files to the container
COPY ./package.json ./
COPY ./package-lock.json ./

# Install libraries
RUN npm install

# Copy the code into the container
COPY ./main.js ./main.js

# our app is running on port 5000 within the container, so need to expose it
EXPOSE 5000

# the command that starts our app
CMD ["npm", "run", "start_server"]
```

# Step 6: Build the custom image

We have seen how to build a Docker image before. To make things easier, we are going to add another shortcut to our `package.json` file to build the docker image (after the `start_server` shortcut):

```
"docker_build": "docker build -t node_server_1 .",
```

Then we can run it with:

```
$ npm run docker_build
```

This will create the `node_server_1` image from which we can instantiate a new container with our HTTP app running inside it.

# Step 7: Running a container with out custom image

Now with everything setup we can create a new container and run our application inside it. To make life easier, we will add two additional shortcuts to the `package.json` file:

```
"docker_run": "docker run -d --rm --name my_node_server_1 -p 5000:5000 node_server_1",
"docker_stop": "docker stop my_node_server_1"
```

Now, we can simply run the following from the terminal:

```
$ npm run docker_run
```

Now, you can visit [http://localhost:5000](http://localhost:5000) in your browser of choice and interact with the server running in the Docker container.

To stop the server do this:

```
$ npm run docker_stop
```