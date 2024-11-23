FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy all other source code files into the container
COPY . .

# Expose the port that the app will run on
EXPOSE 3001

# Run the NestJS app
CMD ["npm", "run", "start"]
