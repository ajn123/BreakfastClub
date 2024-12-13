#!/bin/bash

# Configuration
DROPLET_IP="159.203.125.23"
SSH_USER="root"
SSH_KEY_PATH="~/.ssh/infinite"
GITHUB_USERNAME="ajn123"  # Your GitHub username
REPO_NAME="BreakfastClub"  # Your repository name
IMAGE_NAME="ghcr.io/${GITHUB_USERNAME}/${REPO_NAME}:main"

# Exit on any error
set -e

echo "🚀 Starting deployment to Digital Ocean..."

# Create deployment directory structure on the server
echo "📁 Creating directory structure..."
ssh -i $SSH_KEY_PATH $SSH_USER@$DROPLET_IP << 'ENDSSH'
mkdir -p ~/breakfast-club/api
mkdir -p ~/breakfast-club/nginx
ENDSSH

# Copy configuration files
echo "📄 Copying configuration files..."
scp -i $SSH_KEY_PATH docker-compose.prod.yml $SSH_USER@$DROPLET_IP:~/breakfast-club/docker-compose.yml
scp -i $SSH_KEY_PATH .env.production $SSH_USER@$DROPLET_IP:~/breakfast-club/api/.env
scp -i $SSH_KEY_PATH docker/prod/nginx/default.conf $SSH_USER@$DROPLET_IP:~/breakfast-club/nginx/

# Deploy to Digital Ocean
echo "🔄 Deploying to Digital Ocean..."
ssh -i $SSH_KEY_PATH $SSH_USER@$DROPLET_IP << ENDSSH
    cd ~/breakfast-club

    # Login to GitHub Container Registry
    echo $GITHUB_TOKEN | docker login ghcr.io -u $GITHUB_USERNAME --password-stdin

    # Pull the latest image
    docker pull $IMAGE_NAME
    
    # Stop and remove existing containers with force
    echo "Stopping existing containers..."
    docker compose down -v --remove-orphans
    
    # Clean up any lingering volumes
    echo "Cleaning up volumes..."
    docker volume prune -f
    
    # Start new containers with health check
    echo "Starting containers..."
    docker compose up -d
    
    # Wait for containers to be healthy
    echo "Waiting for containers to be ready..."
    for i in {1..30}; do
        if docker compose ps | grep -q "healthy"; then
            echo "Containers are healthy!"
            break
        fi
        echo "Waiting for containers to be healthy... ($i/30)"
        sleep 5
    done
    
    # Check container status
    echo "Checking container status..."
    docker compose ps
    
    # If containers are still not healthy, show logs and exit
    if ! docker compose ps | grep -q "healthy"; then
        echo "❌ Containers failed to start properly. Showing logs..."
        docker compose logs
        exit 1
    fi
    
    # Only proceed with the rest if containers are healthy
    echo "🔧 Setting up application..."
    
    # Create storage structure first
    docker compose exec -T api bash -c '
        mkdir -p /var/www/storage/framework/{views,cache,sessions} && \
        mkdir -p /var/www/storage/logs && \
        chown -R www-data:www-data /var/www/storage && \
        chmod -R 775 /var/www/storage
    ' || { echo "❌ Failed to set up storage directories"; exit 1; }
    
    # Build assets for production
    echo "Building frontend assets..."
    docker compose exec api bash -c "cd /var/www && npm install && npx tsc && vite build && vite build --ssr && chown -R www-data:www-data /var/www/public/build && chmod -R 755 /var/www/public/build && chown -R www-data:www-data /var/www && php-fpm -R --nodaemonize"
    
    # Set proper permissions for built assets
    echo "Setting permissions for built assets..."
    docker compose exec api chown -R www-data:www-data /var/www/public/build
    docker compose exec api chmod -R 755 /var/www/public/build
    
    # Verify the build
    echo "Checking built assets..."
    docker compose exec api ls -la /var/www/public/build
    
    # Clear Laravel caches
    docker compose exec api php artisan cache:clear
    docker compose exec api php artisan config:clear
    docker compose exec api php artisan view:clear
    docker compose exec api php artisan route:clear

    # Set up logging
    echo "📝 Setting up Laravel logging..."
    docker compose exec api mkdir -p /var/www/storage/logs
    docker compose exec api touch /var/www/storage/logs/laravel.log
    docker compose exec api chown -R www-data:www-data /var/www/storage/logs
    docker compose exec api chmod -R 775 /var/www/storage/logs
    
    # Enable debug mode temporarily
    docker compose exec api php artisan config:clear
    
    # Check logs
    echo "📋 Checking Laravel logs..."
    docker compose exec api tail -f /var/www/storage/logs/laravel.log &
    
    # Make a test request
    echo "🔍 Making test request..."
    curl -v http://localhost/
    
    # Show the logs after the request
    echo "📋 Showing recent Laravel logs..."
    docker compose exec api cat /var/www/storage/logs/laravel.log || echo "No Laravel log found"

    # Check Nginx logs
    echo "Checking Nginx logs..."
    docker compose logs nginx

    # Check Node.js and npm installation
    echo "Checking Node.js environment..."
    docker compose exec api node -v
    docker compose exec api npm -v
    
    # Debug PHP-FPM and Nginx communication
    echo "Debugging PHP-FPM and Nginx..."
    
    # Check if PHP-FPM is running
    echo "Checking PHP-FPM process..."
    docker compose exec api ps aux | grep php-fpm
    
    # Check PHP-FPM logs
    echo "Checking PHP-FPM logs..."
    docker compose exec api tail -f /var/log/php-fpm.log &
    
    # Test PHP-FPM socket connection
    echo "Testing PHP-FPM connection..."
    docker compose exec nginx curl -v api:9000
    
    # Check Nginx error logs
    echo "Checking Nginx error logs..."
    docker compose exec nginx cat /var/log/nginx/error.log
    
    # Check file permissions
    echo "Checking file permissions..."
    docker compose exec api ls -la /var/www
    docker compose exec api ls -la /var/www/public
    
    # Make a test request and show real-time logs
    echo "Making test request..."
    curl -v http://localhost/
    
    # Show recent logs
    echo "Recent Nginx error logs..."
    docker compose exec nginx tail -n 50 /var/log/nginx/error.log

    # Clean up unused images
    docker image prune -f
ENDSSH

echo "✅ Deployment completed successfully!" 