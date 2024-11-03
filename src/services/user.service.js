import { responseFromUser } from "../dtos/user.dto.js";
import {
    addUser,
    getUser,
    getUserPreferenceByUserId,
    setPreference,
} from "../repositories/user.repository.js"

export const userSignUp = async(data)=>{
    const joinUserId = await addUser({
        "email": data.email,
        "name" : data.name,
        "gender": data.gender,
        "location": data.location,
        "mobileNumber": data.mobileNumber,
        "birth": data.birth,
        "address": data.address,
        "password": data.password,
        "passwordConfirm": data.passwordConfirm,
        "userType": data.userType,
        "userState": data.userState,
        "point": 0,
    });

    if(joinUserId == null){
        throw new Error("이미 존재하는 이메일입니다.");
    }

    for(const preference of data.preferences){
        await setPreference(joinUserId, preference);
    }

    const user = await getUser(joinUserId);
    const preferences = await getUserPreferenceByUserId(joinUserId);

    return responseFromUser({user, preferences});
}