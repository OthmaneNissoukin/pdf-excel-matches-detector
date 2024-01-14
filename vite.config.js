import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://othmanenissoukin.github.io/pdf-excel-matches-detector/",
  plugins: [react()],
});
