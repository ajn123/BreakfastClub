

# Getting Started 

- Make sure you have Docker and Docker Compose installed.
- Run `docker compose up` to start the development environment.
- Make sure have an app key generated with `docker compose exec api php artisan key:generate`.
- Run `docker compose exec api composer install` to install the dependencies.
- Run `docker compose exec api php artisan migrate` to create the tables.
- Run `docker compose exec api php artisan db:seed` to seed the database.



# Notes

- [ ] Get tests working.
- [x] Get docker compose to work with vite.
- [ ] Get k8s to work.