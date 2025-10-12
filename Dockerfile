# ==================================
# STAGE 1: Build the React App (Workshop)
# ==================================
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
# This leverages Docker's layer caching. If these files don't change,
# Docker won't re-run 'npm install', speeding up future builds.
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build the app for production. This creates a 'build' folder.
RUN npm run build

# ==================================
# STAGE 2: Serve the App with Nginx (Showroom)
# ==================================
FROM nginx:1.25-alpine

# Copy the static files from the 'builder' stage (the workshop)
# into Nginx's public directory (the showroom).
COPY --from=builder /app/build /usr/share/nginx/html

# Tell Docker that the container listens on port 80
EXPOSE 80

# The command to start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
