# Build stage
FROM node:24 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Production stage
FROM node:24-alpine
RUN npm install -g serve
WORKDIR /app
# CHANGE THIS LINE FROM /app/build TO /app/dist
COPY --from=builder /app/dist ./dist
EXPOSE 3005
# UPDATE THE SERVE COMMAND TO POINT TO THE DIST FOLDER
CMD ["serve", "-s", "dist", "-l", "3005"]