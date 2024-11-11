import { addReview } from "../repositories/review.repository.js";
import { responseFromReview } from "../dtos/review.dto.js";
import { getReviewByUserId } from "../repositories/review.repository.js";

export const addReviewService = async (reviewData) => {
  const reviewId = await addReview(reviewData);
  if (reviewId == null) {
    throw new Error("Store does not exist.");
  }
  return responseFromReview({ id: reviewId, ...reviewData });
};

export const listUserReviews = async (userId, cursor, limit = 10) => {
  const reviews = await getReviewByUserId(userId, cursor, limit);
  return reviews.map(responseFromReview);
};
