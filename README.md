# Movie Project

This is a spring boot and react full stack application with mongodb atlas as a database.

## Mongodb setup

1. Create a mongodb database either in atlas or locally and copy the uri.
2. Create collections named movies and reviews.
3. Import the movies.json into the movies collection in mongodb.

## Spring Boot Setup ( moviesapi )

1. Add .env file in moviesapi/src/resources/.env and add the database, username, password and cluster similar to as given in example.env file.
2. Run moviesapi application.
3. This will run the backend application on http://localhost:8090

## React Setup ( movies-client )

### npm install

This is install the required packages and add it in node_modules.

### npm start

Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.
