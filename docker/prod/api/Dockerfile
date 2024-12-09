# Build stage
FROM node:18-alpine as node-builder
WORKDIR /var/www
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# PHP stage
FROM php:8.2-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    postgresql-dev \
    oniguruma-dev \
    libxml2-dev \
    zip \
    unzip \
    git

# Install PHP extensions
RUN docker-php-ext-install pdo_pgsql mbstring exif pcntl bcmath
RUN pecl install redis && docker-php-ext-enable redis

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create non-root user
RUN addgroup -g 1000 appgroup && \
    adduser -u 1000 -G appgroup -h /home/appuser -D appuser

# Set working directory
WORKDIR /var/www

# Copy built assets from node stage
COPY --from=node-builder /var/www/public/build /var/www/public/build

# Copy application source
COPY . .
COPY .env.production .env

# Set permissions
RUN chown -R appuser:appgroup /var/www && \
    chmod -R 755 /var/www/storage bootstrap/cache

# Install production dependencies
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Switch to non-root user
USER appuser

# Expose port 9000
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"] 