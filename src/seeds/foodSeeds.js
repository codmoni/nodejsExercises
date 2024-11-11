import { prisma } from "../db.config";

export const seedFoodCategories = async () => {
  const foodCategories = [
    { id: 1, name: "치킨" },
    { id: 2, name: "한식" },
    { id: 3, name: "카페/디저트" },
    { id: 4, name: "중식" },
    { id: 5, name: "분식" },
    { id: 6, name: "샌드위치" },
    { id: 7, name: "회/초밥" },
    { id: 8, name: "버거" },
    { id: 9, name: "일식/돈가스" },
    { id: 10, name: "피자/양식" },
    { id: 11, name: "아시안" },
    { id: 12, name: "고기/구이" },
    { id: 13, name: "찜/탕" },
    { id: 14, name: "족발/보쌈" },
    { id: 15, name: "야식" },
    { id: 16, name: "도시락/죽" },
  ];

  for (const category of foodCategories) {
    await prisma.food.upsert({
      where: { id: category.id },
      update: {},
      create: { id: category.id, name: category.name },
    });
  }
};
