const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

function listReviews(movieId) {
  return knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "m.movie_id": movieId })
    .groupBy("r.review_id", "c.critic_id")
    .orderBy("r.review_id");
}

function isShowing() {
  return knex('movies as m')
    .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
    .select('m.*')
    .distinct('m.movie_id', 'mt.movie_id', 'm.title')
    .where({ 'mt.is_showing': true })
}

function readTheaters(movieId) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*")
    .where({ "m.movie_id": movieId })
    .groupBy("m.movie_id", "t.theater_id")
    .orderBy("t.theater_id")
}

function read(movieId) {
  return knex("movies")
    .select("*")
    .where({ "movie_id": movieId })
    .first();
}



module.exports = {
  list,
  listReviews,
  isShowing,
  readTheaters,
  read,
};