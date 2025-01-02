import express from "express";
import {
  handleAddReview,
  handleListUserReviews,
} from "../controllers/review.controller.js";

const router = express.Router();

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: 리뷰 생성
 *     description: 특정 가게에 리뷰를 추가합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: 사용자 ID
 *               storeId:
 *                 type: string
 *                 description: 가게 ID
 *               score:
 *                 type: integer
 *                 description: 리뷰 점수 (1~5)
 *               text:
 *                 type: string
 *                 description: 리뷰 내용
 *     responses:
 *       200:
 *         description: 리뷰 생성 성공
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
 *                     reviewId:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     storeId:
 *                       type: string
 *                     score:
 *                       type: integer
 *                     text:
 *                       type: string
 *       400:
 *         description: 리뷰 생성 실패
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
 *                     reason:
 *                       type: string
 */
router.post("/", handleAddReview);

/**
 * @swagger
 * /reviews/{userId}:
 *   get:
 *     summary: 유저 리뷰 목록 조회
 *     description: 특정 유저가 작성한 리뷰 목록을 조회합니다.
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: 유저 ID
 *       - name: cursor
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: 페이징을 위한 커서 ID
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *         description: 한 번에 가져올 리뷰 개수
 *     responses:
 *       200:
 *         description: 리뷰 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: SUCCESS
 *                 success:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       reviewId:
 *                         type: string
 *                       userId:
 *                         type: string
 *                       storeId:
 *                         type: string
 *                       score:
 *                         type: integer
 *                       text:
 *                         type: string
 *       400:
 *         description: 리뷰 조회 실패
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
 *                     reason:
 *                       type: string
 */
router.get("/:userId", handleListUserReviews);

export default router;
