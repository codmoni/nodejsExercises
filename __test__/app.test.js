import request from "supertest";
import app from "../app.js";
import { seedFoodCategories } from "../src/seeds/foodSeeds.js";

beforeAll(async () => {
  await seedFoodCategories();
});

describe("API Tests", () => {
  //1. 회원가입 테스트
  it("should sign up a user", async () => {
    const response = await request(app)
      .post("/users/signup")
      .send({
        email: "testuser14@example.com",
        name: "회원14",
        gender: "MALE",
        location: "Test Location3",
        mobileNumber: "1234567890",
        birth: "2000-01-01",
        address: "Test Address",
        password: "testpassword",
        passwordConfirm: "testpassword",
        userType: "USER",
        userState: 1,
        point: 0,
        preferences: [1, 2, 4],
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });
});
