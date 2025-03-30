import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      theme: {
        extend: {
          animation: {
            "slide-in": "slideIn 0.3s ease-out",
          },
          keyframes: {
            slideIn: {
              "0%": { transform: "translateX(100%)" },
              "100%": { transform: "translateX(0)" },
            },
          },
        },
      },
    }),
  ],
});
