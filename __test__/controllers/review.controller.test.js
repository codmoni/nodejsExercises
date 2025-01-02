import request from "supertest"
import app from "../../src/app.js"
import * as reviewService from "../../src/services/review.service.js";

describe("POST /review", () => {
    beforeEach(()=>{
        jest.clearAllMocks();
    })

    it("should create a review successfully", async () => {
        //Given
        const mockReviewData = {
            userId: 100,
            storeId: 23,
            score: 4.5,
            text: "성북구의 숨은 맛집!",
        }

        const mockResponse = {
            id: 1,
            ...mockReviewData,
        }

        console.log("Mocking 시작");
        jest.spyOn(reviewService, "addReviewService").mockResolvedValue(mockResponse);
        console.log("Mocking 완료");

        //When
        const response = await request(app)
            .post("/review")
            .send(mockReviewData)
        console.log("API 호출 완료");
        
        //Then
        expect(response.status).toBe(200);
        expect(response.body.resultType).toBe("SUCCESS");
        expect(response.body.success).toEqual(mockResponse);
        expect(reviewService.addReviewService).toHaveBeenCallWith(mockReviewData);
    })
})