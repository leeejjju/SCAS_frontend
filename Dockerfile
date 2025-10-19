# STAGE 1: Build the React App (Workshop)
FROM node:18-alpine AS builder

WORKDIR /app
COPY scas-frontend/package*.json ./
RUN npm install

COPY scas-frontend/. ./
RUN npm run build

# STAGE 2: Serve the App with Nginx (Showroom)
FROM nginx:1.25-alpine

COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
