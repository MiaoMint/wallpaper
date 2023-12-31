import { request } from "~/server/request";
import { Image, Purity, Source } from "~/types/image";

export default defineEventHandler(async (event): Promise<Image[]> => {
  const { page } = getQuery(event);
  const { post } = await request(
    Source.Gelbooru,
    `/index.php?page=dapi&s=post&q=index&json=1&pid=${page}`,
  );

  return post.map((image: any): Image => {
    return {
      id: image.id,
      sample: image.preview_url,
      source: Source.Gelbooru,
      purity: (image.rating === "general" ? "sfw" : "nsfw") as Purity,
      resolution: `${image.width}x${image.height}`,
      height: image.height,
      width: image.width,
    };
  });
});
