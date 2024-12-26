
[![Laravel CI](https://github.com/ajn123/BreakfastClub/actions/workflows/ci.yml/badge.svg)](https://github.com/ajn123/BreakfastClub/actions/workflows/ci.yml)


# Getting Started 

The dockerfile configuration was mostly taken from https://github.com/acadea/laravel-sail-nginx-php-fpm/tree/main
and updated to php 8.2.


# Run Development
- Make sure you have Docker and Docker Compose installed.
- Make sure you copy a .env.example file to .env and fill in the values.
```
cd api
sail up -d
sail npm run dev
sail artisan migrate
# treat sail as you would any command with php artisan, replacing php with sail
```

# Run Production
```
cd api
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up

# to run migrations
docker-compose exec php-fpm php /var/www/laravel/current/artisan migrate 
```
The application will be available at http://localhost:80
The application should be hot reloaded when you make changes to the code.

# Notes

- [x] Get tests working.
- [x] Get docker compose to work with vite.
- [x] Get docker compose to work with mailhog.
- [x] Get docker compose to work with nginx.
- [x] Get a local database working.
- [x] Build out questionnaire.



## Application Ports

| Service    | Port  | Description                               |
|------------|-------|-------------------------------------------|
| Laravel    | 80    | Main Application                      |
| Vite       | 5173  | Frontend Development Server               |
| Mailpit    | 1025  | Email Testing Web Interface               |


## Useful Commands
```
sail artisan queue:work
sail artisan pail
sail artisan db:seed # you need this for the questionnaire to work
sail artisan test
```