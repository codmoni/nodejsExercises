import { addStore } from "../repositories/store.repository.js";
import { responseFromStore } from "../dtos/store.dto.js";

// 가게 생성
export const addStoreService = async (storeData) => {
  try {
    const storeId = await addStore(storeData);
    if (!storeId) {
      throw new Error("STORE_CREATION_FAILED");
    }
    return responseFromStore({ id: storeId, ...storeData });
  } catch (error) {
    throw error;
  }
};
