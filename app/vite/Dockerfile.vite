# Dockerfile.vite
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run build

# Expose the port Vite runs on
EXPOSE 5173

# Start Vite development server
CMD ["npm", "run", "dev"]