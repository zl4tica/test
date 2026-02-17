# Build stage
FROM node:24 AS builder
WORKDIR /app

# Declare ARGs (Passed from drone build-args)
ARG VITE_API_URL
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_STORAGE_URL

# Set them as ENV vars so Vite can see them during 'npm run build'
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID
ENV VITE_STORAGE_URL=$VITE_STORAGE_URL

COPY package*.json ./
# Using legacy-peer-deps to handle the React 19 / Helmet conflict
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Production stage
FROM node:24-alpine
RUN npm install -g serve
WORKDIR /app
# Copy from 'dist' because you are using Vite
COPY --from=builder /app/dist ./dist
EXPOSE 3005
CMD ["serve", "-s", "dist", "-l", "3005"]