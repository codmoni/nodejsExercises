import { prisma } from "../db.config.js";

export const addReview = async (reviewData) => {
  try {
    const storeExists = await prisma.store.findUnique({
      where: { id: reviewData.storeId },
    });

    if (!storeExists) return null;

    const review = await prisma.review.create({
      data: {
        user_id: reviewData.userId,
        store_id: reviewData.storeId,
        score: reviewData.score,
        text: reviewData.text,
      },
    });

    return review.id;
  } catch (err) {
    throw new Error(`Review creation failed: ${err.message}`);
  }
};

export const getReviewByUserId = async (userId, cursor, limit) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { user_id: userId },
      take: limit,
      skip: cursor ? 1 : 0,
      orderBy: { created_at: "desc" },
    });
    return reviews;
  } catch (err) {
    throw new Error(`Failed to retrieve reviews: ${err.message}`);
  }
};
