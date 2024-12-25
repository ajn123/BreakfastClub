#!/bin/bash

# Variables
DROPLET_IP="209.97.157.80"
REMOTE_USER="root"  # Replace with your SSH username
PROJECT_DIR="./api"  # Replace with the path to your local project
REMOTE_DIR="/root"  # Replace with the desired path on the droplet

# Copy the project to the remote droplet
# Copy .env file to the remote droplet



# SSH into the remote droplet and run commands
ssh "$REMOTE_USER@$DROPLET_IP" << 'ENDSSH'



    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
        echo "Installing Docker..."
        apt-get update
        apt-get install -y apt-transport-https ca-certificates curl software-properties-common
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
        apt-get update
        apt-get install -y docker-ce docker-ce-cli containerd.io
    else
        echo "Docker is already installed"
    fi

    # Check if Docker Compose is installed
    if ! command -v docker-compose &> /dev/null; then
        echo "Installing Docker Compose..."
        curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        chmod +x /usr/local/bin/docker-compose
    else
        echo "Docker Compose is already installed"
    fi

    # Navigate to the api folder
    # Clone the Laravel Sail Nginx PHP-FPM repository
    echo "Cloning Laravel Sail Nginx PHP-FPM repository..."

    rm -rf BreakfastClub
    git clone https://github.com/ajn123/BreakfastClub.git
ENDSSH

# Copy .env file to the remote droplet
scp "$PROJECT_DIR/.env" "$REMOTE_USER@$DROPLET_IP:$REMOTE_DIR/BreakfastClub/api/.env"


# SSH into the remote droplet and run commands
ssh "$REMOTE_USER@$DROPLET_IP" << 'ENDSSH'


    echo "Building Docker containers..."
    cd BreakfastClub/api

    chmod -R 777 .

    docker compose -f docker-compose.yml build

    # Start the Docker containers
    echo "Starting Docker containers..."

    # Remove any existing mysql.lock file if it exists
    rm -f ~/.sail/data/mysql/mysql.sock.lock;


    # Start docker compose
    docker compose -f docker-compose.yml up -d
    docker-compose exec php-fpm php /var/www/laravel/current/artisan migrate


echo "Deployment complete!"