import { ImageDetail } from "~/types/image";

const images: ImageDetail[] = [];
let isInit = false;

const getImages = (): ImageDetail[] => {
  if (!isInit) {
    const imagesStr = localStorage.getItem("images");
    if (imagesStr) {
      images.push(...JSON.parse(imagesStr));
    }
    isInit = true;
  }
  return images;
};

const addFavorite = (image: ImageDetail) => {
  if (isFavorite(image.id, image.source)) {
    return;
  }
  images.unshift(image);
  localStorage.setItem("images", JSON.stringify(images));
};

const removeFavorite = (image: ImageDetail) => {
  const index = getImages().findIndex(
    (item) => item.id === image.id && item.source === image.source,
  );
  if (index > -1) {
    images.splice(index, 1);
    localStorage.setItem("images", JSON.stringify(images));
  }
};

const isFavorite = (id: string, source: string) => {
  const index = getImages().findIndex(
    (item) => item.id === id && item.source === source,
  );
  return index > -1;
};

export { getImages, addFavorite, removeFavorite, isFavorite };
