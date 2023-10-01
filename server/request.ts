import { Source } from "~/types/image";
import { fetchJson } from "~/utils/fetch";

interface Init extends RequestInit {
  resultType?: "json" | "text";
}

export const request = async (
  source: Source,
  input: RequestInfo | URL,
  init?: Init | undefined,
) => {
  let baseUrl = "";
  switch (source) {
    case Source.Wallhaven:
      baseUrl = "https://wallhaven.cc/api/v1";
      break;
    case Source.Konachan:
      baseUrl = "https://konachan.com";
      break;
    case Source.Gelbooru:
      baseUrl = "https://gelbooru.com";
      break;
    case Source.Zerochan:
      baseUrl = "https://www.zerochan.net";
      break;
    case Source.AnimePictures:
      baseUrl = "https://anime-pictures.net/api/v3";
      break;
  }

  if (init?.resultType === "text") {
    return (await fetch(baseUrl + input, init)).text();
  }

  return await fetchJson(baseUrl + input, init);
};
