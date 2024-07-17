import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// import dts from "vite-plugin-dts";
// vite-plugin-banner

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  build: {
    minify: false,
    lib: {
      entry: "./src/index.ts",
      name: "antdx",
      fileName: "antdx",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue", "dayjs", /lodash-es/, /ant-design-vue/, /\@leezi/],
      input: "./src/index.ts",
      output: [
        {
          format: "es",
          entryFileNames: "[name].js",
          preserveModules: true,
          preserveModulesRoot: "src",
          dir: "es",
        },
      ],
    },
  },
});
