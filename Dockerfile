# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src
RUN npm i --only=production
EXPOSE 3000
CMD ["node", "src/server.js"]
