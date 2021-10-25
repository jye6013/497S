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