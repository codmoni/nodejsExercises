import request from "supertest";
import app from "../app.js";

describe("API Tests", () => {
  //1. 회원가입 테스트
  it("should sign up a user", async () => {
    const response = await request(app).post("/users/signup").send({
      email: "testuser@example.com",
      name: "Test User",
      gender: "MALE",
      location: "Test Location",
      mobileNumber: "1234567890",
      birth: "2000-01-01",
      address: "Test Address",
      password: "testpassword",
      passwordConfirm: "testpassword",
      userType: "USER",
      userState: 1,
      point: 0,
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });
});
