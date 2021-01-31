# f1-dashboard

This project aims at becoming a truly complete and customizable dashboard to display Formula 1 Championship's data.

The ultimate goal is to make a dashboard that enables one to create its own view of the F1 data, and share it for other to use or improve.

But, let's be honest, it currently mostly serves as an excuse for me to try and learn some exciting techs, which are [Prisma](https://github.com/prisma/prisma) and [Nx](https://github.com/nrwl/nx), and the list might grow.

# Install and run the project

In order to install the project, the only thing you need to do is to run `yarn` inside the project directory.

You will then need a `PostgreSQL` database running (I highly recommend using docker for this),
and set the environment variables in the API to point to your database url.

You will then need to initialize your database and prisma, by running :
``` sh
yarn db:migrate       # Applies all the migrations to your database
yarn prisma:generate  # Generates prisma client from your database state
```

Once this is done, you should be all set to launch the platform using 
``` sh
yarn start api

# In another terminal
yarn start 
```

You will then see that the frontend is not displaying anything, because your Database is empty, you need to run the crons for that.
I have built some scripts to help fetching data more quickly, namely `fetch-seasons.sh` and `fetch-rounds.sh`.

Check that the environment variables match your services urls, and run 
``` sh
sh fetch-seasons.sh
sh fetch-rounds.sh
```
After that, the frontend should display data from the last 10 years, and detailled data (including race results) from the last season.

# Project architecture

The project is organized as a Monorepo managed by Nx in order to share as much code as possible between the services.
Nx is really useful because it handles all the boilerplate of configuring the multiple projects and their dependencies. It has allowed me to have a project up and running in a matter of minutes.

It is organized as several projects, organized in two groups, `Apps` and `Libs`.

## Apps

### F1-API

This service is the core of the app, as it encapsulates the Database. It moslty consists of two parts, the `prisma` part, that handles every request from the service to the database, and the `express` part, that handles requests from the outside to the service.

The database architecture is extremely close to the one used by `ergast`, the source of every data that I'm currently using. This allows me to have very little code in the API, because this is not the most interesting part of the project.

### F1-dashboard

F1-dashboard is the frontend of the project, written in `React`, it displays the API's data in a more nice way.
It uses `redux` along with `redux-toolkit` as Global State Management, and `material-ui` as design library.

### Crons

Crons are the scripts that run to fetch data from `ergast` API and store it in F1-api.
They are aimed to be used in a Cloud environment, like `AWS Lambdas` or `Google Cloud Functions`, but can be run locally.

## Libs

Libs are project that are shared between two or more apps in the repository.
They are useful to keep consistency, and reduce the amount of change needed when updating a common behaviour (following the "Common Closure Principle" as much as I can).

### API Clients

Api clients are a principle that I believe I have first heard of from Netflix, which tells the API developer to always provide a client to interact with the API. 
This ensures that updates to the API can be reflected without pain through the whole application.

This allows some nice features:

- **End to End typing**: if the client using your API is fully typed, then there can not be any discrepency between types in your API, and in the application using it
- **Reduce code size**: the client handles the authentication, the route names, etc. that can be a real pain for the developer.

### API Interfaces

This is where are stored every common interfaces between the services, in order to reduce code duplication.
