import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import {
  addReviewService,
  listUserReviews,
} from "../services/review.service.js";

export const handleAddReview = async (req, res) => {
  try {
    console.log("리뷰 생성을 요청했습니다.");
    console.log("req body: ", req.body);

    const review = await addReviewService(bodyToReview(req.body));

    res.status(StatusCodes.OK).success(review);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).error({
      errorCode: "리뷰 생성 오류 발생",
      reason: error.message,
      data: error.data || null,
    });
  }
};

export const handleListUserReviews = async (req, res) => {
  try {
    console.log("유저 리뷰 조회를 요청했습니다.");
    console.log("req.body: ", req.body);

    const { userId } = req.params;
    const { cursor, limit } = req.query;
    const reviews = await listUserReviews(userId, cursor, parseInt(limit, 10));

    res.status(StatusCodes.OK).success(reviews);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).error({
      errorCode: "유저 리뷰 조회 오류 발생",
      reason: error.message,
      data: error.data || null,
    });
  }
};
