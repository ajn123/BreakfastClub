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

USER dev

# Copy existing application directory contents
COPY . .

# Copy existing application directory permissions
COPY --chown=dev:dev . .


# Install dependencies
RUN composer install && \
    npm install && \
    npm run build

# Start both PHP-FPM and Vite
CMD ["sh", "-c", "php-fpm & npm run dev"]
