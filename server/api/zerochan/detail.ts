import { request } from "~/server/request";
import { Image, ImageDetail, Purity, Source } from "~/types/image";

export default defineEventHandler(async (event): Promise<ImageDetail> => {
  const { id } = getQuery(event);
  const image = await request(Source.Zerochan, `/${id}?json`);

  return {
    id: image.id,
    sample: image.medium,
    source: Source.Zerochan,
    purity: Purity.SFW,
    resolution: `${image.width}x${image.height}`,
    height: image.height,
    width: image.width,
    tags: image.tags,
    url: image.full,
    imageSource: image.source,
  };
});
