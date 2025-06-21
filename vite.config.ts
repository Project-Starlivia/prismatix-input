import {defineConfig} from "vite";
import tailwind from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "src")
        }
    },
    plugins: [
        tailwind(),
    ],
});