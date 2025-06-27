import {defineConfig} from "vite";
import tailwindcss from "@tailwindcss/vite";
import * as path from "node:path";

export default defineConfig({
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "src")
        }
    },
    plugins: [
        tailwindcss(),
    ],
});