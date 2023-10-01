import { request } from "~/server/request";
import { Image, Source } from "~/types/image";

export default defineEventHandler(async (event): Promise<Image[]> => {
  const { page } = getQuery(event);
  const { data } = await request(Source.Wallhaven, `/search?page=${page}`);
  return data.map(
    (image: any): Image => ({
      resolution: image.resolution,
      source: Source.Wallhaven,
      sample: image.thumbs.large,
      id: image.id,
      purity: image.purity,
      height: image.resolution.split("x")[1],
      width: image.resolution.split("x")[0],
    }),
  );
});
