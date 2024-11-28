export const bodyToReview = (body) => {
  return {
    userId: body.userId,
    storeId: body.storeId,
    score: body.score,
    text: body.text,
  };
};

export const responseFromReview = (review) => {
  return {
    reviewId: review.id,
    userId: review.userId,
    storeId: review.storeId,
    score: review.score,
    text: review.text,
  };
};
