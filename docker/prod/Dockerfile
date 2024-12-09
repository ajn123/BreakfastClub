# Use the official PHP image with FPM
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
    npm && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

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

# Copy application source code
COPY ./api .

# Debug step to list files in /var/www
RUN ls -la /var/www

# Set permissions
RUN chown -R dev:www-data /var/www && \
    mkdir -p /var/www/storage /var/www/bootstrap/cache && \
    chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Switch to the non-root user
USER dev

# Install PHP and Node.js dependencies
RUN composer install --no-dev --optimize-autoloader && \
    npm install && \
    npm run build

# Expose the port the app runs on
EXPOSE 8000

# Start PHP-FPM
CMD ["php-fpm"]
