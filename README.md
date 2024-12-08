
[![Laravel CI](https://github.com/ajn123/BreakfastClub/actions/workflows/ci.yml/badge.svg)](https://github.com/ajn123/BreakfastClub/actions/workflows/ci.yml)




# Getting Started 

- Make sure you have Docker and Docker Compose installed.
- Go to the docker directory `cd docker/dev`.
- Run `docker compose up` to start the development environment.
- Make sure have an app key generated with `docker compose exec api php artisan key:generate`.
- Run `docker compose exec api composer install` to install the dependencies.
- Run `docker compose exec api php artisan migrate` to create the tables.
- Run `docker compose exec api php artisan db:seed` to seed the database.


## Aliases 
To better execute commands in development you can add these aliases to your shell.

```bash
alias dapi='cd /path/to/docker-laravel-api && docker compose exec api'
```


# Notes

- [x] Get tests working.
- [x] Get docker compose to work with vite.
- [ ] Get k8s to work.
- [x] Get docker compose to work with mailhog.
- [ ] Build out questionnaire.


## Application Ports

| Service    | Port  | Description                               |
|------------|-------|-------------------------------------------|
| Laravel    | 8000  | Main API Application                      |
| Vite       | 5173  | Frontend Development Server               |
| Mailhog    | 8025  | Email Testing Web Interface               |

