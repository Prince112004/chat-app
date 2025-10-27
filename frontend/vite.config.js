// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import daisyui from "daisyui";
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
      theme: {
        extend: {
          animation: {
            border: "border 4s linear infinite",
          },
          keyframes: {
            border: {
              to: { "--border-angle": "360deg" },
            },
          },
        },
      },
      plugins: [daisyui],
    }),
  ],
});
