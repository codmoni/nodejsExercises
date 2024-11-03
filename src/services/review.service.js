import { addReview } from "../repositories/review.repository.js";
import { responseFromReview } from "../dtos/review.dto.js";

export const addReviewService = async (reviewData) => {
    const reviewId = await addReview(reviewData);
    if (reviewId == null) {
        throw new Error("Store does not exist.");
    }
    return responseFromReview({ id: reviewId, ...reviewData });
};
