
[![Laravel CI](https://github.com/ajn123/BreakfastClub/actions/workflows/ci.yml/badge.svg)](https://github.com/ajn123/BreakfastClub/actions/workflows/ci.yml)


# Getting Started 

The dockerfile configuration was mostly taken from https://github.com/acadea/laravel-sail-nginx-php-fpm/tree/main
and updated to php 8.2.


- Make sure you have Docker and Docker Compose installed.
```
./vendor/bin/sail up

docker-compose exec php-fpm php /var/www/laravel/current/artisan migrate 
```
The application will be available at http://localhost:80
The application should be hot reloaded when you make changes to the code.

# Notes

- [x] Get tests working.
- [x] Get docker compose to work with vite.
- [x] Get docker compose to work with mailhog.
- [x] Get docker compose to work with nginx.
- [ ] Get 
- [ ] Build out questionnaire.


## Testing
Work in progress, still need to get this done.
```
sail artisan dusk
```


## Application Ports

| Service    | Port  | Description                               |
|------------|-------|-------------------------------------------|
| Laravel    | 80    | Main API Application                      |
| Vite       | 5173  | Frontend Development Server               |
| Mailpit    | 1025  | Email Testing Web Interface               |

