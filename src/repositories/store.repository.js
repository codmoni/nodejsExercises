import { pool } from "../db.config.js";

export const addStore = async (storeData) => {
    const conn = await pool.getConnection();

    try {
        const [result] = await pool.query(
            `INSERT INTO store (owner_id, food_id, region_id, detail_address, name, opening_time, closing_time) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                storeData.ownerId,
                storeData.foodId,
                storeData.regionId,
                storeData.detailAddress,
                storeData.name,
                storeData.openingTime,
                storeData.closingTime
            ]
        );
        return result.insertId;
    } catch (err) {
        throw new Error(`Store creation failed: ${err.message}`);
    } finally {
        conn.release();
    }
};
