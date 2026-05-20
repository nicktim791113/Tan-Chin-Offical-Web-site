import { defineConfig } from "astro/config";

const isGitHubPages = process.env.DEPLOY_TARGET === "github-pages";

export default defineConfig({
  site: isGitHubPages ? "https://nicktim791113.github.io" : "https://www.tanchin.com.tw",
  base: isGitHubPages ? "/Tan-Chin-Offical-Web-site/" : "/",
  output: "static"
});
