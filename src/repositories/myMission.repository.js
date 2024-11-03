import { pool } from "../db.config.js";

export const addMissionToChallenge = async (challengeData) => {
    const conn = await pool.getConnection();

    try {
        const [check] = await pool.query(
            'SELECT EXISTS(SELECT 1 FROM my_mission WHERE user_id = ? AND mission_id = ?) AS missionExists;',
            [challengeData.userId, challengeData.missionId]
        );

        if (check[0].missionExists) {
            return null;
        }

        const [result] = await pool.query(
            `INSERT INTO my_mission (user_id, mission_id, complete) VALUES (?, ?, ?)`,
            [challengeData.userId, challengeData.missionId, false]
        );

        return result.insertId;
    } catch (err) {
        throw new Error(`Mission challenge failed: ${err.message}`);
    } finally {
        conn.release();
    }
};
