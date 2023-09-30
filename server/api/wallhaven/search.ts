import { request } from "~/server/request";
import { Image } from "~/types/image";

export default defineEventHandler(async (event): Promise<Image[]> => {
  const { kw, page } = getQuery(event);
  if (!kw) {
    return [];
  }
  const { data } = await request("wallhaven", `/search?page=${page}&q=${kw}`);
  return data.map(
    (image: any): Image => ({
      resolution: image.resolution,
      source: "wallhaven",
      sample: image.thumbs.large,
      id: image.id,
      purity: image.purity,
    }),
  );
});
