# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy the rest of the source code
COPY . .

# Expose backend port
EXPOSE 5000

# Start the backend
CMD ["node", "src/server.js"]
