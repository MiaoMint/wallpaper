import { request } from "~/server/request";
import { Image, ImageDetail, Purity, Source } from "~/types/image";

export default defineEventHandler(
  async (event): Promise<ImageDetail | null> => {
    const { id } = getQuery(event);
    if (!id) {
      setResponseStatus(event, 400);
      return null;
    }
    const { post, tags } = await request(
      Source.AnimePictures,
      `/posts/${id}?extra=similar_pictures&lang=en`,
    );

    const md5 = post.md5;

    const url = `https://images.anime-pictures.net/${md5.substring(
      0,
      3,
    )}/${md5}${post.ext}`;

    return {
      id: post.id,
      sample: post.medium_preview,
      source: Source.AnimePictures,
      purity: Purity.SFW,
      resolution: `${post.width}x${post.height}`,
      height: post.height,
      width: post.width,
      tags: tags.map((tag: any) => tag.tag.tag),
      url,
      imageSource: post.source,
    };
  },
);
