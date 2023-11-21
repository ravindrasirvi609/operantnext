# Use Node.js 18.14.0 as the base image
FROM node:18.14.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the application
 CMD ["npm", "run", "dev"]
