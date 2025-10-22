/// <reference types="vitest" />
/// <reference types="vite-plugin-svgr/client" />

import { defineConfig, normalizePath } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const pdfjsDistPath = path.dirname(require.resolve("pdfjs-dist/package.json"));
const cMapsDir = normalizePath(path.join(pdfjsDistPath, "cmaps"));
const wasmDir = normalizePath(path.join(pdfjsDistPath, "wasm"));
const standardFontsDir = normalizePath(
  path.join(
    path.dirname(require.resolve("pdfjs-dist/package.json")),
    "standard_fonts"
  )
);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";
  return {
    base: "/",
    plugins: [
      svgr({
        svgrOptions: {
          prettier: false,
          svgo: false,
          svgoConfig: {
            plugins: [
              {
                name: "preset-default",
                params: { overrides: { removeViewBox: false } },
              },
            ],
          },
          titleProp: true,
          ref: true,
        },
      }),
      react(),
      viteStaticCopy({
        targets: [
          { src: standardFontsDir, dest: "" },
          { src: cMapsDir, dest: "" },
          { src: wasmDir, dest: "" },
        ],
      }),
    ],
    server: { hmr: true, port: 3000, open: true },
    build: { outDir: "dist" },
    publicDir: "src/static",
    resolve: { alias: { "@styles": path.resolve(__dirname, "src/styles") } },
    css: {
      modules: {
        generateScopedName: isProduction
          ? "[hash:base64]"
          : "[path][name]_[local]",
      },
      preprocessorOptions: { scss: { api: "modern" } },
    },
    test: {
      globals: true,
      environment: "jsdom",
      include: ["**/*.test.tsx"],
      setupFiles: "./vitestSetup.ts",
    },
  };
});
