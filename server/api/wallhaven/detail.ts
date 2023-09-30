import { request } from "~/server/request";
import { ImageDetail } from "~/types/image";

export default defineEventHandler(
  async (event): Promise<ImageDetail | null> => {
    const { id } = getQuery(event);
    if (!id) {
      return null;
    }
    const { data } = await request("wallhaven", `/w/${id}`);
    return {
      resolution: data.resolution,
      source: "wallhaven",
      sample: data.thumbs.large,
      id: data.id,
      tags: data.tags.map((tag: { name: any }) => tag.name),
      url: data.path,
      fileSize: data.file_size,
      purity: data.purity,
    };
  },
);
