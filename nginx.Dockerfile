# Use the official PHP image with FPM
FROM php:8.1-fpm AS php-fpm

# Install necessary PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Use the official Nginx image
FROM nginx:latest

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the PHP application from the previous stage
COPY --from=php-fpm /var/www/html /var/www/html

# Copy the PHP-FPM socket configuration
COPY --from=php-fpm /usr/local/etc/php-fpm.d/www.conf /usr/local/etc/php-fpm.d/www.conf

# Set the working directory
WORKDIR /var/www/html

# Expose the port Nginx is running on
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]