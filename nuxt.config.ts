// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  app: {
    keepalive: true,
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "Wallpaper",
      meta: [
        {
          name: "description",
          content: "Wallpaper",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      IMAGE_PROXY_PREFIX: process.env.IMAGE_PROXY_PREFIX,
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
