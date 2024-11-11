import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import {
  addReviewService,
  listUserReviews,
} from "../services/review.service.js";

export const handleAddReview = async (req, res) => {
  try {
    const reviewData = bodyToReview(req.body);
    const review = await addReviewService(reviewData);
    res.status(StatusCodes.CREATED).json(review);
  } catch (error) {
    console.error("리뷰 추가 중 오류 발생:", error.message);
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const handleListUserReviews = async (req, res) => {
  try {
    const { userId } = req.params;
    const { cursor, limit } = req.query;
    const reviews = await listUserReviews(userId, cursor, parseInt(limit, 10));
    res.status(StatusCodes.OK).json(reviews);
  } catch (error) {
    console.error("나의 리뷰 조회 중 오류 발생:", error.message);
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
