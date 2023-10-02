import { request } from "~/server/request";
import { ImageDetail, Purity, Source } from "~/types/image";
import { JSDOM } from "jsdom";

export default defineEventHandler(
  async (event): Promise<ImageDetail | null> => {
    const { id } = getQuery(event);
    if (!id) {
      setResponseStatus(event, 400);
      return null;
    }
    const html = await request(Source.Konachan, `/post/show/${id}`, {
      resultType: "text",
    });

    const doc = new JSDOM(html).window.document;

    const url =
      doc.querySelector(".original-file-changed")?.getAttribute("href") ?? "";
    const md5 = url.split("/")[4];
    const sample = `https://konachan.com/data/preview/${md5.slice(
      0,
      2,
    )}/${md5.slice(2, 4)}/${md5}.jpg`;

    const resolution = doc
      .querySelector("#stats")
      ?.textContent?.match(/(\d+)x(\d+)/)
      ?.slice(1);

    const height = Number(resolution?.[1] ?? 0);
    const width = Number(resolution?.[0] ?? 0);

    return {
      id: String(id),
      sample,
      source: Source.Konachan,
      purity: (doc
        .querySelector("#stats")
        ?.textContent?.includes("Rating: Safe")
        ? "sfw"
        : "nsfw") as Purity,
      resolution: resolution?.join("x") ?? "",
      tags: [...doc.querySelectorAll("#tag-sidebar li a:nth-child(2)")].map(
        (tag) => tag.textContent ?? "",
      ),
      url,
      imageSource:
        doc
          .querySelector("#stats > ul > li:nth-child(5) > a")
          ?.getAttribute("href") ?? "",
      height,
      width,
    };
  },
);
