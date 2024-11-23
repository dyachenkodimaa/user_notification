# Use the official Node.js image as a base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install --production

# Copy all other source code files into the container
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Run the Notification Service app
CMD ["npm", "run", "start"]
