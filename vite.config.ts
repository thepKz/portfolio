import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

/** GitHub Pages project sites live at /<repo>/; CI sets GITHUB_REPOSITORY=owner/repo */
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1]
const base =
  process.env.CI === "true" && repo ? `/${repo}/` : "/"

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
