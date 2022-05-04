require("dotenv").config();
const express = require("express");
const cors = require("cors");
const knex = require("./db/connection")
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");
const app = express();

/*let corsOptions = {
    origin: 'https://chris-welovemovies-backend.herokuapp.com',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT, DELETE"
}*/
//Trying to fix cors issue, got it at this url "https://stackabuse.com/handling-cors-with-node-js/"
//must also use: app.use(cors(corsOptions))

app.set("db", knex);
app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;