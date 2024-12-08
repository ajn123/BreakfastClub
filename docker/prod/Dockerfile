FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libpq-dev \
    nodejs \
    npm

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_pgsql mbstring exif pcntl bcmath
RUN pecl install redis && docker-php-ext-enable redis

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create system user
RUN useradd -G www-data,root -u 1000 -d /home/dev dev
RUN mkdir -p /home/dev/.composer && \
    chown -R dev:dev /home/dev

WORKDIR /var/www

RUN mkdir -p /var/www/storage /var/www/bootstrap/cache
RUN chown -R dev:www-data /var/www && \
    chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Copy existing application directory contents
COPY api/ .

# Copy existing application directory permissions
COPY --chown=dev:dev . .

# Set correct permissions for storage, cache, and SSR directories
RUN chown -R dev:www-data /var/www/storage /var/www/bootstrap/cache && \
    chmod -R 775 /var/www/storage /var/www/bootstrap/cache && \
    mkdir -p /var/www/vendor && \
    chown -R dev:www-data /var/www/vendor && \
    mkdir -p /var/www/bootstrap/ssr && \
    chown -R dev:www-data /var/www/bootstrap/ssr && \
    chmod -R 775 /var/www/bootstrap/ssr

# Create node_modules directory with correct permissions
RUN mkdir -p /var/www/node_modules && \
    chown -R dev:www-data /var/www/node_modules && \
    chmod -R 775 /var/www/node_modules && \
    touch /var/www/package-lock.json && \
    chown dev:www-data /var/www/package-lock.json && \
    chmod 664 /var/www/package-lock.json

# Create build directory with correct permissions
RUN mkdir -p /var/www/public/build && \
    chown -R dev:www-data /var/www/public/build && \
    chmod -R 775 /var/www/public/build

USER dev

# Install dependencies
RUN composer install && \
    npm install && \
    npm run build

# Start both PHP-FPM and Vite
CMD ["sh", "-c", "php-fpm & npm run dev"]
