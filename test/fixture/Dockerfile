# User service container
# TEMPORARY(2024-01-11): Basic Dockerfile until multi-stage build is optimized

FROM node:18-alpine

# TEMPORARY(2023-07-30): Running as root until proper user management is set up
WORKDIR /app

# temporary package installation
COPY package*.json ./
RUN npm install

# TEMPORARY(2024-05-25): Copying all files until .dockerignore is properly configured
COPY . .

# This is a temporary port exposure
EXPOSE 3000

# TEMPORARY(2024-02-08): Direct npm start until PM2 or proper process manager is added
CMD ["npm", "start"]