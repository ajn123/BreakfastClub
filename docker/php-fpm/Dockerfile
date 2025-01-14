# Build stage for Composer dependencies
FROM composer:latest as composer

WORKDIR /app

COPY . .

# Install the PHP intl extention
RUN docker-php-ext-install pcntl 

RUN composer install 
# Build stage for Node dependencies

FROM node:18.19-alpine3.18 as node
WORKDIR /app
COPY . .
COPY --from=composer /app/vendor/ ./vendor/
RUN npm install
RUN npm run build

# Copy from build stages to final image
# Copied from cyberduck/php-fpm-laravel
#https://github.com/Cyber-Duck/php-fpm-laravel/blob/8.1/Dockerfile

FROM php:8.2-fpm

# Install system dependencies first
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libgmp-dev \
    gettext \
    zip \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Configure and install PHP extensions
RUN docker-php-ext-configure zip && \
    docker-php-ext-install \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    soap \
    zip \
    intl \
    gmp


ENV COMPOSER_MEMORY_LIMIT='-1'

# Update GPG keys before installing packages
RUN apt-get update && \
    apt-get install -y gnupg2 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
# Then install your packages
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    libmemcached-dev \
    libzip-dev \
    libz-dev \
    libpq-dev \
    libjpeg-dev \
    libpng-dev \
    libfreetype6-dev \
    libssl-dev \
    openssh-server \
    libmagickwand-dev \
    git \
    cron \
    nano \
    libxml2-dev \
    libreadline-dev \
    libgmp-dev \
    mariadb-client \
    libonig-dev \
    unzip \
    && apt-get clean 

# Install soap extention
RUN docker-php-ext-install soap

# Install for image manipulation
RUN docker-php-ext-install exif

# Install the PHP pcntl extention
RUN docker-php-ext-install pcntl

# Install the PHP zip extention
RUN docker-php-ext-install zip

# Install the PHP pdo_mysql extention
RUN docker-php-ext-install pdo_mysql

# Install the PHP bcmath extension
RUN docker-php-ext-install bcmath

# Install the PHP gmp extention
RUN docker-php-ext-install gmp

RUN pecl install redis && docker-php-ext-enable redis

# Install the xdebug extension
RUN pecl install xdebug

# Install the php memcached extension
RUN pecl install memcached && docker-php-ext-enable memcached

# Install composer and add its bin to the PATH.
RUN curl -s http://getcomposer.org/installer | php && \
    echo "export PATH=${PATH}:/var/www/vendor/bin" >> ~/.bashrc && \
    mv composer.phar /usr/local/bin/composer
# Source the bash
RUN . ~/.bashrc

#####################################
# Laravel Schedule Cron Job:
#####################################

RUN echo "* * * * * www-data /usr/local/bin/php /var/www/artisan schedule:run >> /dev/null 2>&1"  >> /etc/cron.d/laravel-scheduler
RUN chmod 0644 /etc/cron.d/laravel-scheduler

ADD ./docker/php-fpm/laravel.ini /usr/local/etc/php/conf.d

# docker-compose exec php-fpm dep --> locally installed Deployer binaries
RUN echo '#!/bin/bash\n/usr/local/bin/php /var/www/vendor/bin/dep "$@"' > /usr/bin/dep
RUN chmod +x /usr/bin/dep
# docker-compose exec php-fpm art --> php artisan
RUN echo '#!/bin/bash\n/usr/local/bin/php /var/www/artisan "$@"' > /usr/bin/art
RUN chmod +x /usr/bin/art
# docker-compose exec php-fpm migrate --> php artisan migrate
RUN echo '#!/bin/bash\n/usr/local/bin/php /var/www/artisan migrate "$@"' > /usr/bin/migrate
RUN chmod +x /usr/bin/migrate
# docker-compose exec php-fpm fresh --> php artisan migrate:fresh --seed
RUN echo '#!/bin/bash\n/usr/local/bin/php /var/www/artisan migrate:fresh --seed' > /usr/bin/fresh
RUN chmod +x /usr/bin/fresh
# docker-compose exec php-fpm t --> run the tests for the project and generate testdox
RUN echo '#!/bin/bash\n/usr/local/bin/php /var/www/artisan config:clear\n/var/www/vendor/bin/phpunit -d memory_limit=2G --stop-on-error --stop-on-failure --testdox-text=tests/report.txt "$@"' > /usr/bin/t
RUN chmod +x /usr/bin/t
# docker-compose exec php-fpm d --> run the Laravel Dusk browser tests for the project
RUN echo '#!/bin/bash\n/usr/local/bin/php /var/www/artisan config:clear\n/bin/bash\n/usr/local/bin/php /var/www/artisan dusk -d memory_limit=2G --stop-on-error --stop-on-failure --testdox-text=tests/report-dusk.txt "$@"' > /usr/bin/d
RUN chmod +x /usr/bin/d

RUN rm -r /var/lib/apt/lists/*

RUN usermod -u 1000 www-data

WORKDIR /var/www/laravel/current


COPY . .

COPY --from=composer /app/vendor/ ./vendor/
COPY --from=node /app/public/build/ ./public/build/
COPY --from=node /app/node_modules/ ./node_modules/

RUN groupadd -g 1000 laravel && \
    usermod -a -G laravel www-data && \
    chown -R www-data:laravel storage public && \
    chmod -R 775 storage public
USER root
RUN chmod -R 775 storage public

WORKDIR /var/www

COPY ./docker/php-fpm/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
RUN ln -s /usr/local/bin/docker-entrypoint.sh /
ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 9000
CMD ["php-fpm"]