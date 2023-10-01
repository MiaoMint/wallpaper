import { request } from "~/server/request";
import { Image, Purity, Source } from "~/types/image";

export default defineEventHandler(async (event): Promise<Image[]> => {
  const { page, kw } = getQuery(event);
  if (!kw) {
    return [];
  }

  const { posts } = await request(
    Source.AnimePictures,
    `/posts?page=${page}&search_tag=${kw}&lang=en`,
  );

  return posts.map((image: any): Image => {
    const md5 = image.md5;
    const sample = `https://cdn.anime-pictures.net/previews/${md5.substring(
      0,
      3,
    )}/${md5}_cp.${image.have_alpha ? "png" : "jpg"}`;
    return {
      id: image.id,
      sample,
      source: Source.AnimePictures,
      purity: Purity.SFW,
      resolution: `${image.width}x${image.height}`,
      height: image.height,
      width: image.width,
    };
  });
});
