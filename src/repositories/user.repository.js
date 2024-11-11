import { prisma } from "../db.config.js";

export const addUser = async (data) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingUser) return null;

  const createdUser = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      gender: data.gender,
      location: data.location,
      mobile_number: data.mobileNumber,
      birth: data.birth,
      address: data.address,
      password: data.password,
      password_confirm: data.passwordConfirm,
      user_type: data.userType,
      status: data.userState,
      point: data.point || 0,
    },
  });
  return createdUser;
};

export const getUser = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return user;
};

export const setPreference = async (userId, foodCategoryId) => {
  try {
    await prisma.myFood.upsert({
      where: {
        user_id_food_id: { user_id: userId, food_id: foodCategoryId },
      },
      update: {},
      create: {
        user_id: userId,
        food_id: foodCategoryId,
      },
    });
  } catch (error) {
    console.error("Preference 설정 중 오류 발생:", error.message);
    throw new Error("Preference 설정 실패");
  }
};

export const getUserPreferenceByUserId = async (userId) => {
  const preferences = await prisma.myFood.findMany({
    where: { user_id: userId },
    select: {
      user_id: true,
      food: { select: { name: true } },
    },
    orderBy: { food_id: "asc" },
  });

  return preferences;
};
