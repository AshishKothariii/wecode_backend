# Use the Node.js 18 Alpine image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install GCC and other necessary build tools
RUN apk update && apk add --no-cache g++ make

# Copy only the package.json and package-lock.json files to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Command to run the worker script
CMD [ "node", "worker.js" ]
