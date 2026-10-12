import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Allows access via the Cloudflare quick tunnel (*.trycloudflare.com),
    // whose hostname changes each time the tunnel restarts.
    allowedHosts: [".trycloudflare.com"],
  },
});
