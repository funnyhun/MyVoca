import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import vitePluginSvgr from "vite-plugin-svgr";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const config = {
    plugins: [react(), vitePluginSvgr(), basicSsl()],
    base: mode === "dev" ? "/" : "./",
    server: mode === "dev" ? { https: true } : undefined,
  };

  return config;
});
