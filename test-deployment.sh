#!/bin/bash

# Exit on any error
set -e

echo "🧪 Testing deployment setup locally..."

# 1. Test docker-compose.prod.yml
echo "📋 Testing docker-compose.prod.yml..."

# Create test directories
echo "Creating test directories..."
mkdir -p test-deploy/api
mkdir -p test-deploy/nginx

# Copy necessary files
echo "Copying configuration files..."
cp docker-compose.prod.yml test-deploy/docker-compose.yml
cp .env.production test-deploy/api/.env
cp docker/prod/nginx/default.conf test-deploy/nginx/

# Move to test directory
cd test-deploy

# Pull and start containers
echo "Starting containers..."
docker compose pull
docker compose down -v # Ensure clean state
docker compose up -d

# Wait for containers to start
echo "Waiting for containers to start..."
sleep 10

# Test container status
echo "Checking container status..."
docker compose ps

# Test PHP-FPM
echo "Testing PHP-FPM..."
docker compose exec api ps aux | grep php-fpm

# Test Nginx
echo "Testing Nginx..."
curl -v http://localhost

# Test asset building
echo "Testing asset building..."
docker compose exec api ls -la /var/www/public/build

# Check logs
echo "Checking container logs..."
docker compose logs api
docker compose logs nginx

# 2. Test deploy.sh (simulation)
echo "🧪 Testing deploy.sh (simulation)..."

# Create test SSH key (if needed)
if [ ! -f ~/.ssh/test_key ]; then
    ssh-keygen -t rsa -f ~/.ssh/test_key -N ""
fi

# Modify deploy.sh for testing
sed 's/DROPLET_IP="159.203.125.23"/DROPLET_IP="localhost"/' deploy.sh > test-deploy.sh
sed -i 's/SSH_KEY_PATH="~\/.ssh\/infinite"/SSH_KEY_PATH="~\/.ssh\/test_key"/' test-deploy.sh
chmod +x test-deploy.sh

echo "✅ Test completed!"
echo "📝 To clean up, run: cd test-deploy && docker compose down -v && cd .. && rm -rf test-deploy"

# Show container status
docker compose ps 