# Development stage
FROM node:18-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=development /app/node_modules ./node_modules
COPY --from=development /app/dist ./dist
COPY --from=development /app/package*.json ./
EXPOSE 3000
CMD ["node", "dist/main"]