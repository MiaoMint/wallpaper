import { requestWallhaven } from "~/server/request";
import { ImageDetail } from "~/types/image";

export default defineEventHandler(
  async (event): Promise<ImageDetail | null> => {
    const { id } = getQuery(event);
    if (!id) {
      return null;
    }
    const { data } = await requestWallhaven(`/w/${id}`);
    return {
      resolution: data.resolution,
      source: "wallhaven",
      sample: data.thumbs.original,
      id: data.id,
      tags: data.tags.map((tag: { name: any }) => tag.name),
      url: data.path,
      views: data.views,
      favorites: data.favorites,
      fileSize: data.file_size,
      purity: data.purity,
    };
  },
);
