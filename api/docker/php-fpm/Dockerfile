# Build stage for Composer dependencies
FROM composer:latest as composer

WORKDIR /app

COPY . .

# Install the PHP intl extention
RUN docker-php-ext-install pcntl 

RUN composer install

# Build stage for Node dependencies

FROM node:18-alpine as node
WORKDIR /app
COPY . .
COPY package.json package-lock.json ./
COPY --from=composer /app/vendor/ ./vendor/
RUN npm install
RUN npm run build

# Copy from build stages to final image
# Copied from cyberduck/php-fpm-laravel
#https://github.com/Cyber-Duck/php-fpm-laravel/blob/8.1/Dockerfile

FROM php:8.2-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    libzip-dev \
    zip \
    autoconf \
    gcc \
    g++ \
    make

# Configure and install PHP extensions (removed autoconf from here)
RUN docker-php-ext-configure zip && \
    docker-php-ext-install \
    pdo_mysql \
    pcntl \
    zip

# Install Redis
RUN pecl install redis && docker-php-ext-enable redis

ENV COMPOSER_MEMORY_LIMIT='-1'

WORKDIR /var/www/laravel/current

COPY . .

COPY --from=composer /app/vendor/ ./vendor/
COPY --from=node /app/public/build/ ./public/build/
COPY --from=node /app/node_modules/ ./node_modules/



USER root
RUN chmod -R 775 storage public


COPY ./docker/php-fpm/laravel.ini /usr/local/etc/php/conf.d/laravel.ini

# Copy custom PHP-FPM configuration
COPY ./docker/php-fpm/www.conf /usr/local/etc/php-fpm.d/www.conf

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD test -d /var/www/laravel/current/node_modules || exit 1

EXPOSE 9000


WORKDIR /var/www

# Copy entrypoint script (use absolute path from build context)
COPY ./docker/php-fpm/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

CMD ["php-fpm"]

