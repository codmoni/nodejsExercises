import { pool } from "../db.config.js";

export const addMission = async (missionData) => {
    const conn = await pool.getConnection();

    try {
        const [result] = await pool.query(
            `INSERT INTO mission (store_id, point, deadline, content) VALUES (?, ?, ?, ?)`,
            [missionData.storeId, missionData.point, missionData.deadline, missionData.content]
        );

        return result.insertId;
    } catch (err) {
        throw new Error(`Mission creation failed: ${err.message}`);
    } finally {
        conn.release();
    }
};
