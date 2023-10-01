import { request } from "~/server/request";
import { Image, ImageDetail, Purity, Source } from "~/types/image";

export default defineEventHandler(async (event): Promise<ImageDetail> => {
  const { id } = getQuery(event);
  const { post } = await request(
    Source.Gelbooru,
    `/index.php?page=dapi&s=post&q=index&json=1&id=${id}`,
  );

  const image = post[0];

  return {
    id: image.id,
    sample: image.preview_url,
    source: Source.Gelbooru,
    purity: (image.rating === "general" ? "sfw" : "nsfw") as Purity,
    resolution: `${image.width}x${image.height}`,
    height: image.height,
    width: image.width,
    tags: image.tags.split(" "),
    url: image.file_url,
    imageSource: image.source,
  };
});
