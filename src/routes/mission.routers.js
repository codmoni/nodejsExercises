import express from "express";
import {
  handleAddMission,
  handleListStoreMissions,
} from "../controllers/mission.controller.js";

const router = express.Router();

/**
 * @swagger
 * /missions:
 *   post:
 *     summary: 미션 추가
 *     description: 새로운 미션을 추가합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               storeId:
 *                 type: string
 *                 description: 가게 ID
 *               point:
 *                 type: integer
 *                 description: 미션 포인트
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 description: 미션 기한 (ISO 8601 형식)
 *               content:
 *                 type: string
 *                 description: 미션 내용
 *     responses:
 *       201:
 *         description: 미션 추가 성공
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
 *                     missionId:
 *                       type: string
 *                       description: 생성된 미션 ID
 *                     storeId:
 *                       type: string
 *                     point:
 *                       type: integer
 *                     deadline:
 *                       type: string
 *                       format: date-time
 *                     content:
 *                       type: string
 *       500:
 *         description: 미션 추가 실패
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
 *                       example: MISSION_CREATION_FAILED
 *                     reason:
 *                       type: string
 */
router.post("/", handleAddMission);

/**
 * @swagger
 * /missions/{storeId}:
 *   get:
 *     summary: 가게 미션 조회
 *     description: 특정 가게의 미션 목록을 조회합니다.
 *     parameters:
 *       - name: storeId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: 가게 ID
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
 *         description: 한 번에 가져올 미션 개수
 *     responses:
 *       200:
 *         description: 가게 미션 조회 성공
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
 *                       missionId:
 *                         type: string
 *                       storeId:
 *                         type: string
 *                       point:
 *                         type: integer
 *                       deadline:
 *                         type: string
 *                         format: date-time
 *                       content:
 *                         type: string
 *       500:
 *         description: 가게 미션 조회 실패
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
router.get("/:storeId", handleListStoreMissions);

export default router;
