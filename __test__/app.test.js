import request from "supertest";
import app from "../src/app.js";
import { seedFoodCategories } from "../src/seeds/foodSeeds.js";
import * as userRepository from "../src/repositories/user.repository.js";
import { DuplicateUserEmailError } from "../src/utils/error.js";

// 데이터 시드 및 환경 설정
beforeAll(async () => {
  await seedFoodCategories();
});

describe("POST /users/signup", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Mock 호출 횟수를 초기화
  });

  it("should sign up a user", async () => {
    // Given: 회원가입에 필요한 사용자의 초기 데이터와 환경을 설정
    const mockUserId = 123;
    const mockUserData = {
      id: mockUserId,
      email: "testuser14@example.com",
      name: "회원14",
      gender: "MALE",
      location: "Test Location3",
      mobileNumber: "1234567890",
      birth: "2000-01-01",
      address: "Test Address",
      userType: "USER",
      userState: 1,
      point: 0,
    };

    const mockPreferences = [
      { user_id: mockUserId, food_id: 1 },
      { user_id: mockUserId, food_id: 2 },
      { user_id: mockUserId, food_id: 4 },
    ];

    //Mocking
    jest.spyOn(userRepository, "addUser").mockResolvedValue(mockUserData); // addUser 호출 Mocking
    jest.spyOn(userRepository, "setPreference").mockResolvedValue({}); // setPreference를 성공적으로 호출

    // When: 회원가입 API를 호출하여 사용자 데이터를 전송
    const response = await request(app)
      .post("/users/signup")
      .send({
        email: mockUserData.email,
        name: mockUserData.name,
        gender: mockUserData.gender,
        location: mockUserData.location,
        mobileNumber: mockUserData.mobileNumber,
        birth: mockUserData.birth,
        address: mockUserData.address,
        password: "testpassword",
        passwordConfirm: "testpassword",
        userType: mockUserData.userType,
        userState: mockUserData.userState,
        point: mockUserData.point,
        preferences: [1, 2, 4],
      });

    // Then: API가 성공적으로 응답하고, 기대한 사용자 ID를 포함해야 함
    console.log("Response Body:", response.body);

    expect(response.status).toBe(200);
    expect(response.body.resultType).toBe("SUCCESS");
    expect(response.body.success).toHaveProperty("id", mockUserId);
    expect(userRepository.addUser).toHaveBeenCalledWith(
      expect.objectContaining({
        email: mockUserData.email,
      })
    );
    expect(userRepository.setPreference).toHaveBeenCalledTimes(3); // preferences 호출 횟수 검증
  });

  it("should return an error if the email is already registered", async () => {
    //Given: 이미 존재하는 사용자의 이메일
    const mockUserData = {
      email: "existinguser@example.com",
      name: "회원15",
      gender: "FEMALE",
      location: "Test Location 3",
      mobileNumber: "0987654321",
      birth: "1990-01-01",
      address: "Test Address",
      password: "testpassword",
      passwordConfirm: "testpassword",
      userType: "USER",
      userState: 1,
      point: 0,
    };

    jest.spyOn(userRepository, "addUser").mockImplementation(() => {
      throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", {
        email: mockUserData.email,
      });
    });

    //When: 이미 등록된 이메일로 회원가입 요청
    const response = await request(app)
      .post("/users/signup")
      .send(mockUserData);

    //Then: 실패 응답 검증
    console.log("Response body: ", response.body);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      resultType: "FAIL",
      error: {
        errorCode: "U001",
        reason: "이미 존재하는 이메일입니다.",
        data: {
          email: mockUserData.email,
        },
      },
      success: null,
    });
    expect(userRepository.addUser).toHaveBeenCalledWith(
      expect.objectContaining({
        email: mockUserData.email,
      })
    );
  });
});
