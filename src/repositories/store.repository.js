import { prisma } from "../db.config.js";

export const addStore = async (storeData) => {
  try {
    const store = await prisma.store.create({
      data: {
        owner_id: storeData.ownerId,
        food_id: storeData.foodId,
        region_id: storeData.regionId,
        detail_address: storeData.detailAddress,
        name: storeData.name,
        opening_time: storeData.openingTime,
        closing_time: storeData.closingTime,
        total_score: 0,
      },
    });
    return store.id;
  } catch (err) {
    throw new Error(`Store creation failed: ${err.message}`);
  }
};

export const getReviewByStoreId = async (storeId, cursor, limit) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { store_id: storeId },
      take: limit,
      skip: cursor ? 1 : 0,
      orderBy: { created_at: "desc" },
    });
    return reviews;
  } catch (err) {
    throw new Error(`Failed to retrieve reviews for store: ${err.message}`);
  }
};
