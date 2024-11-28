import express from "express";
import { handleAddStore } from "../controllers/store.controller.js";

const router = express.Router();

/**
 * @swagger
 * /stores:
 *   post:
 *     summary: 가게 생성
 *     description: 새로운 가게를 생성합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ownerId:
 *                 type: string
 *                 description: 가게 소유자 ID
 *               foodId:
 *                 type: string
 *                 description: 음식 ID
 *               regionId:
 *                 type: string
 *                 description: 지역 ID
 *               detailAddress:
 *                 type: string
 *                 description: 상세 주소
 *               name:
 *                 type: string
 *                 description: 가게 이름
 *               openingTime:
 *                 type: string
 *                 format: date-time
 *                 description: 개점 시간 (ISO 8601 형식)
 *               closingTime:
 *                 type: string
 *                 format: date-time
 *                 description: 폐점 시간 (ISO 8601 형식)
 *     responses:
 *       201:
 *         description: 가게 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: SUCCESS
 *                 success:
 *                   type: object
 *                   properties:
 *                     storeId:
 *                       type: string
 *                       description: 생성된 가게 ID
 *                     ownerId:
 *                       type: string
 *                     foodId:
 *                       type: string
 *                     regionId:
 *                       type: string
 *                     detailAddress:
 *                       type: string
 *                     name:
 *                       type: string
 *                     openingTime:
 *                       type: string
 *                       format: date-time
 *                     closingTime:
 *                       type: string
 *                       format: date-time
 *       500:
 *         description: 가게 생성 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: FAIL
 *                 error:
 *                   type: object
 *                   properties:
 *                     errorCode:
 *                       type: string
 *                       example: STORE_CREATION_FAILED
 *                     reason:
 *                       type: string
 */
router.post("/", handleAddStore);

export default router;
