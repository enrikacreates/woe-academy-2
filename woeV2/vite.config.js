import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// The live site's backend; override with VITE_BACKEND_URL once it moves.
const DEFAULT_BACKEND_URL = "https://worldofexplorers.com";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname, "VITE_");
  return {
    plugins: [react()],
    resolve: {
      alias: { "@": path.resolve(import.meta.dirname, "src") },
    },
    define: {
      "import.meta.env.VITE_BACKEND_URL": JSON.stringify(env.VITE_BACKEND_URL || DEFAULT_BACKEND_URL),
    },
  };
});
