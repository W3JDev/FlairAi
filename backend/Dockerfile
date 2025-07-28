# Multi-stage Dockerfile for FlairAi Backend
# Production-optimized with minimal image size

# ================================
# Stage 1: Build Backend
# ================================
FROM node:20-alpine AS backend-builder

WORKDIR /app/backend

# Copy package files
COPY backend/package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY backend/src ./src
COPY backend/tsconfig.json ./

# Build TypeScript
RUN npm run build

# ================================
# Stage 2: Build Frontend
# ================================
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY src-business ./src-business
COPY components ./components
COPY lib ./lib
COPY contexts ./contexts
COPY hooks ./hooks
COPY *.html *.json *.ts *.css ./

# Build frontend
RUN npm run build

# ================================
# Stage 3: Production Runtime
# ================================
FROM node:20-alpine AS production

# Install system dependencies
RUN apk add --no-cache \
    dumb-init \
    && rm -rf /var/cache/apk/*

# Create app user
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup

WORKDIR /app

# Copy backend build
COPY --from=backend-builder --chown=appuser:appgroup /app/backend/dist ./backend/dist
COPY --from=backend-builder --chown=appuser:appgroup /app/backend/node_modules ./backend/node_modules
COPY --from=backend-builder --chown=appuser:appgroup /app/backend/package.json ./backend/

# Copy frontend build
COPY --from=frontend-builder --chown=appuser:appgroup /app/frontend/dist ./frontend/dist

# Create necessary directories
RUN mkdir -p logs uploads && \
    chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 3000) + '/health', (res) => { if (res.statusCode === 200) process.exit(0); else process.exit(1); }).on('error', () => process.exit(1));"

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "backend/dist/server.js"]