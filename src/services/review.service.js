import { addReview } from "../repositories/review.repository.js";
import { responseFromReview } from "../dtos/review.dto.js";
import { getReviewByUserId } from "../repositories/review.repository.js";
import { StoreNotFoundError } from "../utils/error.js";

//가게에 리뷰 생성
export const addReviewService = async (reviewData) => {
  try {
    const reviewId = await addReview(reviewData);
    if (reviewId == null) {
      throw new StoreNotFoundError("가게를 찾을 수 없습니다.", {
        storeId: reviewData.storeId,
      });
    }
    return responseFromReview({ id: reviewId, ...reviewData });
  } catch (error) {
    throw error;
  }
};

//회원의 리뷰 목록 조회
export const listUserReviews = async (userId, cursor, limit = 10) => {
  try {
    const reviews = await getReviewByUserId(userId, cursor, limit);
    return reviews.map(responseFromReview);
  } catch (error) {
    throw error;
  }
};
