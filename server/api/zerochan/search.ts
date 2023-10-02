import { request } from "~/server/request";
import { Image, Purity, Source } from "~/types/image";

export default defineEventHandler(async (event): Promise<Image[]> => {
  const { page, kw } = getQuery(event);
  if (!kw) {
    setResponseStatus(event, 400);
    return [];
  }

  const { items } = await request(Source.Zerochan, `/${kw}?p=${page}&json`);

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
