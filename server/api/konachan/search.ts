import { request } from "~/server/request";
import { Image } from "~/types/image";

export default defineEventHandler(async (event): Promise<Image[]> => {
  const { kw, page } = getQuery(event);
  if (!kw) {
    return [];
  }
  const data = await request("konachan", `/post.json?page=${page}&tags=${kw}`);
  return data.map(
    (image: any): Image => ({
      id: image.id,
      sample: image.preview_url,
      source: "konachan",
      purity: image.rating === "s" ? "sfw" : "nsfw",
      resolution: `${image.width}x${image.height}`,
    }),
  );
});
