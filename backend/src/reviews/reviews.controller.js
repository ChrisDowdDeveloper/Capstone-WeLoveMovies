const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);

  if (!review) 
    return next({
      status: 404,
      message: "Review cannot be found",
    });

  return next();
}

function hasValidFields(req, res, next) {
  const { data: { score, content } = {} } = req.body;

  if (!score && !content)
    return next({
      status: 400,
      message: `Please include at least one field to update. Valid fields: score, content`,
    });

  return next();
}

async function destroy(req, res) {
  const { reviewId } = req.params;
  
  await service.delete(reviewId);
  res.sendStatus(204);
}

async function update(req, res) {
  const { reviewId } = req.params;

  await service.update(reviewId, req.body.data);
  res.json({ data: await service.getUpdatedRecord(reviewId) });
}

module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [
    asyncErrorBoundary(reviewExists),
    hasValidFields,
    asyncErrorBoundary(update),
  ],
};