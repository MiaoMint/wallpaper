import { requestWallhaven } from "~/server/request";
import { Image } from "~/types/image";

export default defineEventHandler(async (event): Promise<Image[]> => {
  const { kw, page } = getQuery(event);
  if (!kw) {
    return [];
  }
  const { data } = await requestWallhaven(`/search?page=${page}&q=${kw}`);
  return data.map((image: any) => ({
    resolution: image.resolution,
    source: "wallhaven",
    img: image.path,
    id: image.id,
  }));
});
