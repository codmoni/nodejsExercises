export const bodyToUser = (body) =>{
    const birth = new Date(body.birth);

    return{
        "email": body.email,
        "name" : body.name,
        "gender": body.gender,
        "location": body.location,
        "mobileNumber": body.mobileNumber,
        "birth": birth,
        "address": body.address,
        "password": body.password,
        "passwordConfirm": body.passwordConfirm,
        "userType": body.userType,
        "userState": body.userState,
        "point": 0,
        "preferences": body.preferences
    }
}

export const responseFromUser =({user, preferences})=>{
    const birth = new Date(user.birth);

    return{
        "email": user.email,
        "name" : user.name,
        "gender": user.gender,
        "location": user.location,
        "mobileNumber": user.mobileNumber,
        "birth": birth,
        "address": user.address,
        "password": user.password,
        "passwordConfirm": user.passwordConfirm,
        "userType": user.userType,
        "userState": user.userState,
        "point": 0,
        "preferences": preferences
    }
}