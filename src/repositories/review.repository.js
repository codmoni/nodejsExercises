import { pool } from "../db.config.js";

export const addReview = async (reviewData) => {
    const conn = await pool.getConnection();

    try {
        const [storeCheck] = await pool.query(
            'SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) AS storeExists;',
            [reviewData.storeId]
        );

        if (!storeCheck[0].storeExists) {
            return null;
        }

        const [result] = await pool.query(
            `INSERT INTO review (user_id, store_id, score, text) VALUES (?, ?, ?, ?)`,
            [reviewData.userId, reviewData.storeId, reviewData.score, reviewData.text]
        );

        return result.insertId;
    } catch (err) {
        throw new Error(`Review creation failed: ${err.message}`);
    } finally {
        conn.release();
    }
};
