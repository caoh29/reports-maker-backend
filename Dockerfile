# ---- Build Stage ----
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the NestJS app
RUN npm run build

# ---- Production Stage ----
FROM node:22-alpine AS production

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --only=production --legacy-peer-deps

# Copy built app and required files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/fonts ./fonts
COPY --from=builder /app/src/assets ./src/assets
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/generated ./generated

# (Optional) Copy any other static/config files needed at runtime
# COPY --from=builder /app/.env .

EXPOSE 3000

CMD ["node", "dist/main"] 