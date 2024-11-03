import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { addReviewService } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
    try {
        const reviewData = bodyToReview(req.body);
        const review = await addReviewService(reviewData);
        res.status(StatusCodes.CREATED).json(review);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};
