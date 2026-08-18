import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Netlify stuff
import netlify from "@netlify/vite-plugin";
import netlifyReactRouter from "@netlify/vite-plugin-react-router";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    netlify(),
    netlifyReactRouter(),
  ],
});
