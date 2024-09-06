/// <reference types="vitest" />
/// <reference types="vite-plugin-svgr/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

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
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
            ],
          },
          titleProp: true,
          ref: true,
        },
      }),
      react(),
    ],
    server: {
      hmr: true,
      port: 3000,
      open: true,
    },
    build: {
      outDir: "dist",
    },
    publicDir: "src/static",
    css: {
      modules: {
        generateScopedName: isProduction
          ? "[hash:base64]"
          : "[path][name]_[local]",
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      include: ["**/*.test.tsx"],
      setupFiles: "./vitestSetup.ts",
    },
  };
});
