import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Specify the output directory for your build
    outDir: "dist",
    // Minify the output (optional)
    minify: true,
    // Set this to true if you want to generate sourcemaps for your production build
    sourcemap: false,
    // Specify additional Rollup options
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        // Provide a custom name for the global variable when using 'script' tag
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
