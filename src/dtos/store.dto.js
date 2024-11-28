export const bodyToStore = (body) => {
  return {
    ownerId: body.ownerId,
    foodId: body.foodId,
    regionId: body.regionId,
    detailAddress: body.detailAddress,
    name: body.name,
    openingTime: new Date(body.openingTime),
    closingTime: new Date(body.closingTime),
  };
};

export const responseFromStore = (store) => {
  return {
    storeId: store.id,
    ownerId: store.ownerId,
    foodId: store.foodId,
    regionId: store.regionId,
    detailAddress: store.detailAddress,
    name: store.name,
    openingTime: store.openingTime,
    closingTime: store.closingTime,
  };
};
