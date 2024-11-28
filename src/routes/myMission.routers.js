import express from "express";
import {
  handleChallengeMission,
  handleListOngoingMissions,
  handleCompleteMission,
} from "../controllers/myMission.controller.js";

const router = express.Router();

/**
 * @swagger
 * /my-missions:
 *   post:
 *     summary: 도전 미션 생성
 *     description: 새로운 도전 미션을 생성합니다.
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
 *               missionId:
 *                 type: string
 *                 description: 미션 ID
 *     responses:
 *       201:
 *         description: 도전 미션 생성 성공
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
 *                     userId:
 *                       type: string
 *                     missionId:
 *                       type: string
 *                     complete:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: 도전 미션 생성 실패
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
 *                       example: MISSION_ALREADY_CHALLENGED
 *                     reason:
 *                       type: string
 */
router.post("/", handleChallengeMission);

/**
 * @swagger
 * /my-missions:
 *   get:
 *     summary: 진행 중 미션 목록 조회
 *     description: 진행 중인 미션 목록을 조회합니다.
 *     parameters:
 *       - name: userId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용자 ID
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
 *         description: 진행 중 미션 목록 조회 성공
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
 *                       userId:
 *                         type: string
 *                       missionId:
 *                         type: string
 *                       complete:
 *                         type: boolean
 *                         example: false
 *       400:
 *         description: 진행 중 미션 조회 실패
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
 *                       example: LIST_MISSIONS_ERROR
 *                     reason:
 *                       type: string
 */
router.get("/", handleListOngoingMissions);

/**
 * @swagger
 * /my-missions:
 *   put:
 *     summary: 미션 완료 처리
 *     description: 진행 중인 미션을 완료 처리합니다.
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
 *               missionId:
 *                 type: string
 *                 description: 미션 ID
 *     responses:
 *       200:
 *         description: 미션 완료 성공
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
 *                     userId:
 *                       type: string
 *                     missionId:
 *                       type: string
 *                     complete:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: 미션 완료 실패
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
 *                       example: COMPLETE_MISSION_ERROR
 *                     reason:
 *                       type: string
 */
router.put("/", handleCompleteMission);

export default router;
