import { request } from "~/server/request";
import { Image, Purity, Source } from "~/types/image";

export default defineEventHandler(async (event): Promise<Image[]> => {
  const { page } = getQuery(event);
  const data = await request(Source.Konachan, `/post.json?page=${page}`);

  return data.map((image: any): Image => {
    return {
      id: image.id,
      sample: image.preview_url,
      source: Source.Konachan,
      purity: (image.rating === "s" ? "sfw" : "nsfw") as Purity,
      resolution: `${image.width}x${image.height}`,
      height: image.height,
      width: image.width,
    };
  });
});
