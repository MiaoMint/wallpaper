import { request } from "~/server/request";
import { Image, Purity, Source } from "~/types/image";

export default defineEventHandler(async (event): Promise<Image[]> => {
  const { page } = getQuery(event);
  const { items } = await request(Source.Zerochan, `/?p=${page}&json`);

  return items.map((image: any): Image => {
    return {
      id: image.id,
      sample: image.thumbnail,
      source: Source.Zerochan,
      purity: Purity.SFW,
      resolution: `${image.width}x${image.height}`,
      height: image.height,
      width: image.width,
    };
  });
});
