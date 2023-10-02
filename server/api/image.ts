// 代理下图片的请求

export default defineEventHandler(async (event) => {
  if (useRuntimeConfig().public.IMAGE_PROXY_PREFIX !== "/api/image?url=") {
    setResponseStatus(event, 400);
    return null;
  }
  const { url } = getQuery(event);
  if (!url) {
    setResponseStatus(event, 400);
    return null;
  }

  const res = await fetch(url as string);
  const blob = await res.blob();
  setResponseHeaders(event, {
    "Content-Type": blob.type,
    "Content-Length": blob.size,
  });
  return blob;
});
