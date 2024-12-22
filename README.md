
[![Laravel CI](https://github.com/ajn123/BreakfastClub/actions/workflows/ci.yml/badge.svg)](https://github.com/ajn123/BreakfastClub/actions/workflows/ci.yml)


# Getting Started 

- Make sure you have Docker and Docker Compose installed.
```
./vendor/bin/sail up
sail artisan migrate
sail npm run dev  # really important or you won't see anything
```
The application will be available at http://localhost:80
The application should be hot reloaded when you make changes to the code.

# Notes

- [x] Get tests working.
- [x] Get docker compose to work with vite.
- [ ] Get k8s to work.
- [x] Get docker compose to work with mailhog.
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

