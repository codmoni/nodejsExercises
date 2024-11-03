import { addStore } from "../repositories/store.repository.js";
import { responseFromStore } from "../dtos/store.dto.js";

export const addStoreService = async (storeData) => {
    const storeId = await addStore(storeData);
    return responseFromStore({ id: storeId, ...storeData });
};
