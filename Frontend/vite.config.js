import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: process.env.PORT || 3000, // Use Render's provided port or default to 3000
    host: "0.0.0.0", // Ensure it binds to all interfaces
  },
});
