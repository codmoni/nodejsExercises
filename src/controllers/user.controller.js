import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async(req, res, next)=>{
    try{
        console.log("회원가입을 요청했습니다.");
        console.log("body:", req.body);
    
        const user = await userSignUp(bodyToUser(req.body));
        res.status(StatusCodes.OK).json(user);
    } catch (error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message});
    }

}