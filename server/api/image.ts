// 代理下图片的请求

export default defineEventHandler(async (event) => {
  const { url } = getQuery(event);
  if (!url) {
    return null;
  }

  const res = await fetch(url as string);
  const blob = await res.blob();
  return blob;
});
