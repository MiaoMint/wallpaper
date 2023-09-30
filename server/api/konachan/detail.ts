import { request } from "~/server/request";
import { ImageDetail } from "~/types/image";
import { JSDOM } from "jsdom";

export default defineEventHandler(
  async (event): Promise<ImageDetail | null> => {
    const { id } = getQuery(event);
    if (!id) {
      return null;
    }
    const html = await request("konachan", `/post/show/${id}`, {
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
    return {
      id: String(id),
      sample,
      source: "konachan",
      purity: doc.querySelector("#stats")?.textContent?.includes("Rating: Safe")
        ? "sfw"
        : "nsfw",
      resolution:
        doc
          .querySelector("#stats")
          ?.textContent?.match(/(\d+)x(\d+)/)
          ?.slice(1)
          .join("x") ?? "",
      tags: [...doc.querySelectorAll("#tag-sidebar li a:nth-child(2)")].map(
        (tag) => tag.textContent ?? "",
      ),
      url,
      imageSource:
        doc
          .querySelector("#stats > ul > li:nth-child(5) > a")
          ?.getAttribute("href") ?? "",
    };
  },
);
