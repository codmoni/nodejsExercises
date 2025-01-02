import express from "express";
import { handleUserSignUp } from "../controllers/user.controller.js";

const userRouter = express.Router();

/**
 * @swagger
 * /users/signup:
 *   post:
 *     tags: user
 *     summary: 회원 가입
 *     description: 새로운 사용자를 등록합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 이메일
 *               name:
 *                 type: string
 *                 description: 이름
 *               gender:
 *                 type: enum
 *                 description: 성별
 *                 enum: [MALE, FEMALE, OTHER]
 *               location:
 *                 type: string
 *                 description: 위치
 *               mobileNumber:
 *                 type: string
 *                 description: 전화번호
 *               birth:
 *                 type: string
 *                 description: 생년월일 (YYYY-MM-DD 형식)
 *               address:
 *                 type: string
 *                 description: 주소
 *               password:
 *                 type: string
 *                 description: 비밀번호
 *               passwordConfirm:
 *                 type: string
 *                 description: 비밀번호 확인
 *               userType:
 *                 type: string
 *                 description: 유저 타입
 *                 enum: [USER, OWNER, ADMIN]
 *               userState:
 *                 type: integer
 *                 description: 유저 상태
 *               point:
 *                 type: integer
 *                 description: 포인트
 *     responses:
 *       200:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: SUCCESS
 *                 error:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *                 success:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 123
 *                     email:
 *                       type: string
 *                       example: testuser14@example.com
 *                     name:
 *                       type: string
 *                       example: 회원14
 *                     gender:
 *                       type: string
 *                       example: MALE
 *                     location:
 *                       type: string
 *                       example: Test Location3
 *                     mobileNumber:
 *                       type: string
 *                       example: 1234567890
 *                     birth:
 *                       type: string
 *                       example: 2000-01-01T00:00:00.000Z
 *                     address:
 *                       type: string
 *                       example: Test Address
 *                     userType:
 *                       type: string
 *                       example: USER
 *                     userState:
 *                       type: integer
 *                       example: 1
 *                     point:
 *                       type: integer
 *                       example: 0
 *                     preferences:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *       400:
 *         description: 잘못된 요청
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
 *                       example: U001
 *                     reason:
 *                       type: string
 *                       example: 이미 존재하는 이메일입니다.
 *                     data:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           example: existinguser@example.com
 *                 success:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */

userRouter.post("/signup", handleUserSignUp);
export default userRouter;
