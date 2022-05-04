const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

function update(reviewId, updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .update(updatedReview, "*");
}

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function getUpdatedRecord(reviewId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ review_id: reviewId })
    .first()
    .then((result) => {
      const updatedRecord = addCritic(result);
      updatedRecord.critic_id = updatedRecord.critic.critic_id;
      return updatedRecord;
    });
}

module.exports = {
  read,
  delete: destroy,
  update,
  getUpdatedRecord,
};
