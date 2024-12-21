# Stage 1: Build the application
FROM node:latest AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . . 

# Build the application
RUN npm run build

# Stage 2: Set up the production environment
FROM php:8.2-fpm

# Install system dependencies and Node.js
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    curl \
    libpq-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs

RUN docker-php-ext-install pdo pdo_pgsql



RUN npm install -g typescript
# Set the working directory
WORKDIR /var/www

# Copy the Laravel application
COPY . .

# Copy node_modules and package-lock.json from build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package-lock.json ./package-lock.json


# Copy the built assets from the build stage
COPY --from=build /app/public/build ./public/build
COPY --from=build /app/public/index.php ./public/index.php


# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install PHP dependencies
RUN composer install

# Set permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

RUN npm run build

# Expose the port the app runs on
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]

