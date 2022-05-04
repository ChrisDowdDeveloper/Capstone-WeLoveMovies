const service = require("./theaters.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieSpecified(req, res, next) {
  const data = await service.list();
  const { movieId } = req.params;
  if (movieId) {
    const validTheaters = []; // array to store only theaters playing movie
    data.filter((theater) => {
      const {
        name,
        address_line_1,
        address_line_2,
        city,
        state,
        zip,
        created_at,
        updated_at,
      } = theater;
      // loops through each theaters' movies and checks if specified movie is_showing
      const validTheater = theater.movies.find(
        (movie) => movie.movie_id === Number(movieId) && movie.is_showing
      );
      const { theater_id, is_showing, movie_id } = validTheater;
      // if theater is showing movie, then theater is pushed into 'validTheaters' array with additional theater-specific information
      if (validTheater)
        return validTheaters.push({
          theater_id,
          theater_id,
          name,
          address_line_1,
          address_line_2,
          city,
          state,
          zip,
          created_at,
          updated_at,
          is_showing,
          movie_id,
        });
    });
    // returns only theaters showing movie specified by movie_id
    return res.json({ data: validTheaters });
  }
  // moves to list() to display all theaters if movie_id not specified
  next();
}


function list(req, res, next) {
  service
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
}


module.exports = {
  list: [asyncErrorBoundary(movieSpecified), list],
};