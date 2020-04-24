// const process = require("process");
const bodyParser = require('body-parser');
const express = require("express");
const routes = require("./routes.js");
const cors = require('cors');

const app = express();
const PORT = 8081;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

/* ---- (ingredients) ---- */
app.get('/ingredients', routes.getAllIngredients);

/* ---- (cuisine) ---- */
app.get('/cuisines', routes.getAllCuisines);

/* ---- (matched cuisine) ---- */
app.get('/cuisines/:ingredients', routes.getMatchedCuisine);

/* ---- (cuisine types) ---- */
app.get('/cuisineTypes', routes.getAllCuisineTypes);

/* ---- (restaurants with given cuisine) ---- */
app.get('/cuisineRestaurants/:cuisineType/:day', routes.getRestaurantsWithCuisine);

/* ---- (top 5 related cuisine to a given cuisine) ---- */
app.get('/relatedCuisines/:cuisineId', routes.getRelatedCuisines);

/* ---- (top 5 related cuisine to a given cuisine) ---- */
app.post('/restaurantsNearby', routes.getNearbyRestaurants);

// Test endpoint
app.get('/test', routes.test);

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

// Cleanup methods on process termination
// process.on('SIGINT', routes.cleanup);
// process.on('SIGTERM', routes.cleanup);
