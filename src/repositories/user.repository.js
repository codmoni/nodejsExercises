import { pool } from "../db.config.js";

export const addUser = async (data) =>{
    const conn = await pool.getConnection();

    try{
        const [confirm] = await conn.query(
            'SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail;',
            data.email
        );

        if(confirm[0].isExistEmail){
            return null;
        }

        const [result] = await conn.query(
            'INSERT INTO user(email, name, gender, location, mobileNumber, birth, address, password, userType, userState, point) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
            [
                data.email,
                data.name,
                data.gender,
                data.location,
                data.mobileNumber,
                data.birth,
                data.address,
                data.password,
                data.userType,
                data.userState,
                data.point
            ]
        );
        
        return result.insertId;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

export const getUser = async(userId) =>{
    const conn = await pool.getConnection();

    try{
        const [user] = await pool.query(
            `SELECT * FROM user WHERE id = ?;`, userId
        );

        console.log(user);

        if(user.length == 0) return null;

        return user;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        )
    } finally{
        conn.release();
    }
}

export const setPreference = async(userId, foodCategoryId) =>{
    const conn = await pool.getConnection();

    try {
      await pool.query(
        `INSERT INTO preferences (food_category_id, user_id) VALUES (?, ?);`,
        [foodCategoryId, userId]
      );
  
      return;
    } catch (err) {
      throw new Error(
        `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
      );
    } finally {
      conn.release();
    }
}

export const getUserPreferenceByUserId = async(userId) =>{
    const conn = await pool.getConnection();

    try {
      const [preferences] = await pool.query(
        "SELECT ufc.id, ufc.food_category_id, ufc.user_id, fcl.name " +
          "FROM preferences ufc JOIN food_category fcl on ufc.food_category_id = fcl.id " +
          "WHERE ufc.user_id = ? ORDER BY ufc.food_category_id ASC;",
        userId
      );
  
      return preferences;
    } catch (err) {
      throw new Error(
        `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
      );
    } finally {
      conn.release();
    }
}