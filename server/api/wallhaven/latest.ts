import { requestWallhaven } from "~/server/request";
import { Image } from "~/types/image";

export default defineEventHandler(async (event): Promise<Image[]> => {
  const { page } = getQuery(event);
  const { data } = await requestWallhaven(`/search?page=${page}`);
  return data.map((image: any) => ({
    resolution: image.resolution,
    source: "wallhaven",
    sample: image.thumbs.large,
    id: image.id,
  }));
});
