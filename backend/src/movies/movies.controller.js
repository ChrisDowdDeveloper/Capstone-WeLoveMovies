const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({
    status: 404,
    messsage: "Movie cannot be found"
  })
};

async function list(req, res, next) {
	if(req.query.is_showing){
		const data = await service.isShowing();
		res.json({ data })
	}
  const data = await service.list();
  res.json({ data });
}

async function listReviews(req, res, next) {
  try {
    const reviews = await service.listReviews(req.params.movieId);
    const mappedReviews = reviews.map((review, index) => {
      const {
        review_id,
        content,
        score,
        critic_id,
        movie_id,
        surname,
        preferred_name,
        organization_name,
      } = review;
      return {
        review_id,
        content,
        score,
        critic_id,
        movie_id,
        critic: { surname, critic_id, preferred_name, organization_name },
      };
    });
    res.json({ data: mappedReviews });
  } catch (error) {
    next(error);
  }
}

async function readTheaters(req, res, next) {
  const { movieId } = req.params;
  const data = await service.readTheaters(movieId)
  res.json({ data })
}

async function read(req, res, next) {
  const { movieId } = req.params;
  const data = await service.read(movieId)
  res.json({ data })
}

module.exports = {
  list: asyncErrorBoundary(list),
  listReviews: [asyncErrorBoundary(movieExists), listReviews],
  read: [asyncErrorBoundary(movieExists), read],
  readTheaters: [asyncErrorBoundary(movieExists), readTheaters],
};