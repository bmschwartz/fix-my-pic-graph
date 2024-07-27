export const getImageUrl = (imageId: string) => {
  return `${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/${imageId}`;
};
