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
    case "wallhaven":
      baseUrl = "https://wallhaven.cc/api/v1";
      break;
    case "konachan":
      baseUrl = "https://konachan.com";
      break;
  }

  if (init?.resultType === "text") {
    return (await fetch(baseUrl + input, init)).text();
  }

  return await fetchJson(baseUrl + input, init);
};
