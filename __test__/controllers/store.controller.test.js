import request from "supertest";
import app from "../../src/app.js";
import * as storeService from "../../src/services/store.service.js";

describe("POST /store", () => {
    beforeEach(()=>{
        jest.clearAllMocks();
    })

    it("should create a store successfully", async () => {
        //Given: 가게 생성에 필요한 mock 데이터 설정
        const mockStoreData = {
            ownerId: 100,
            foodId: 1,
            regionId: 1,
            detailAddress: "Test Address",
            name: "Test Store",
            openingTime:"09:00",
            closingTime:"21:00",
        }

        const mockResponse = {
            storeId: 1,
            ...mockStoreData,
        }

        jest.spyOn(storeService, "addStoreService").mockResolvedValue(mockResponse);

        //When: /store API 호출
        const response = await request(app)
            .post("/stores")
            .send(mockStoreData);

        //Then: 응답 성공
        expect(response.status).toBe(201);
        expect(response.body.resultType).toBe("SUCCESS");
        expect(response.body.success).toEqual(mockResponse);
        expect(storeService.addStoreService).toHaveBeenCalledWith(mockStoreData);
    });

    it("should return an error if store creation fails", async () => {
        //Given: 실패하는 request body
        const mockStoreData = {
            ownerId: 100,
            foodId: 1,
            regionId: 1,
            detailAddress: "Test Address",
            name: "Test Store",
            openingTime:"09:00",
            closingTime:"21:00",
        }

        const mockError = new Error("STORE_CREATION_FAILED");
        mockError.data = {reason: "Database Error"};

        jest.spyOn(storeService, "addStoreService").mockImplementation(()=>{
            throw mockError;
        })

        //When: /store API 호출
        const response = await request(app)
            .post("/stores")
            .send(mockStoreData)

        //Then: 응답 실패
        expect(response.status).toBe(500);
        expect(response.body.resultType).toBe("FAIL");
        expect(response.body.error.reason).toBe("STORE_CREATION_FAILED");
        expect(response.body.error.data).toEqual(mockError.data);
        expect(storeService.addStoreService).toHaveBeenCalledWith(mockStoreData);
    })
})