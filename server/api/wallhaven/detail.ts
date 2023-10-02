import { request } from "~/server/request";
import { ImageDetail, Source } from "~/types/image";

export default defineEventHandler(
  async (event): Promise<ImageDetail | null> => {
    const { id } = getQuery(event);
    if (!id) {
      setResponseStatus(event, 400);
      return null;
    }
    const { data } = await request(Source.Wallhaven, `/w/${id}`);
    return {
      resolution: data.resolution,
      source: Source.Wallhaven,
      sample: data.thumbs.large,
      id: data.id,
      tags: data.tags.map((tag: { name: any }) => tag.name),
      url: data.path,
      fileSize: data.file_size,
      purity: data.purity,
      height: data.resolution.split("x")[1],
      width: data.resolution.split("x")[0],
    };
  },
);
