import { request } from "~/server/request";
import { Image } from "~/types/image";

export default defineEventHandler(async (event): Promise<Image[]> => {
  const { page } = getQuery(event);
  const data = await request("konachan", `/post.json?page=${page}`);

  return data.map((image: any): Image => {
    return {
      id: image.id,
      sample: image.preview_url,
      source: "konachan",
      purity: image.rating === "s" ? "sfw" : "nsfw",
      resolution: `${image.width}x${image.height}`,
    };
  });
});
