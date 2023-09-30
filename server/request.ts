import { fetchJson } from "~/utils/fetch";

export const requestWallhaven = async (
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) => {
  return await fetchJson(`https://wallhaven.cc/api/v1${input}`, init);
};
