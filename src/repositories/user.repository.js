import { prisma } from "../db.config.js";

export const addUser = async (data) => {
  const existingUser = await prisma.user.findFirst({
    where: { email: data.email },
  });
  if (existingUser) return null;

  const createdUser = await prisma.user.create({ data });
  return createdUser.id;
};

export const getUser = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return user;
};

export const setPreference = async (userId, foodCategoryId) => {
  await prisma.myFood.create({
    data: {
      user_id: userId,
      food_id: foodCategoryId,
    },
  });
};

export const getUserPreferenceByUserId = async (userId) => {
  const preferences = await prisma.myFood.findMany({
    where: { user_id: userId },
    select: {
      id: true,
      user_id: true,
      foodCategory: { select: { name: true } },
    },
    orderBy: { food_id: "asc" },
  });

  return preferences;
};
