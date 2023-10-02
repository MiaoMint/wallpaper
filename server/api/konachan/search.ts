import { request } from "~/server/request";
import { Image, Purity, Source } from "~/types/image";

export default defineEventHandler(async (event): Promise<Image[]> => {
  const { kw, page } = getQuery(event);
  if (!kw) {
    setResponseStatus(event, 400);
    return [];
  }
  const data = await request(
    Source.Konachan,
    `/post.json?page=${page}&tags=${kw}`,
  );
  return data.map(
    (image: any): Image => ({
      id: image.id,
      sample: image.preview_url,
      source: Source.Konachan,
      purity: (image.rating === "s" ? "sfw" : "nsfw") as Purity,
      resolution: `${image.width}x${image.height}`,
      height: image.height,
      width: image.width,
    }),
  );
});
