#!/bin/bash

# Variables
DROPLET_IP="159.203.125.23"
REMOTE_USER="root"  # Replace with your SSH username
PROJECT_DIR="./api"  # Replace with the path to your local project
REMOTE_DIR="/root"  # Replace with the desired path on the droplet

# Copy the project to the remote droplet
# Copy .env file to the remote droplet



# SSH into the remote droplet and run commands
ssh "$REMOTE_USER@$DROPLET_IP" << 'ENDSSH'
    # Check if composer is installed
    if ! command -v composer &> /dev/null; then
        echo "Installing Composer..."
        curl -sS https://getcomposer.org/installer | php
        mv composer.phar /usr/local/bin/composer
        chmod +x /usr/local/bin/composer
    else
        echo "Composer is already installed"
    fi

    # Check if npm is installed
    if ! command -v npm &> /dev/null; then
        echo "Installing npm..."
        # First install Node.js which includes npm
        curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
        apt-get install -y nodejs
    else
        echo "npm is already installed"
    fi

    # Navigate to the api folder
    # Clone the Laravel Sail Nginx PHP-FPM repository
    echo "Cloning Laravel Sail Nginx PHP-FPM repository..."

    rm -rf BreakfastClub
    git clone https://github.com/ajn123/BreakfastClub.git
ENDSSH


scp "$PROJECT_DIR/.env" "$REMOTE_USER@$DROPLET_IP:$REMOTE_DIR/BreakfastClub/api/.env"


# SSH into the remote droplet and run commands
ssh "$REMOTE_USER@$DROPLET_IP" << 'ENDSSH'
    # Build the Docker containers
    echo "Building Docker containers..."
    cd BreakfastClub/api

    
    docker compose -f docker-compose.yml build

    # Start the Docker containers
    echo "Starting Docker containers..."
    docker compose -f docker-compose.yml up -d  # Use -d to run in detached mode
ENDSSH

echo "Deployment complete!"