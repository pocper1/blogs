import { defineAstroPaperConfig } from "./src/types/config";

// SITE_URL comes from a GitHub Actions secret; tolerate values without a scheme
const rawSiteUrl = process.env.SITE_URL?.trim().replace(/\/+$/, "");
const siteUrl = rawSiteUrl
  ? rawSiteUrl.startsWith("http")
    ? rawSiteUrl
    : `https://${rawSiteUrl}`
  : "http://localhost:4321";

export default defineAstroPaperConfig({
  site: {
    url: siteUrl,
    title: "Jimmy's Blog",
    description: "Notes on backend engineering, infrastructure, and security.",
    author: "Jimmy Huang",
    profile: "https://jimmyhuang.vercel.app",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Asia/Taipei",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "github",   url: "https://github.com/pocper1" },
    { name: "linkedin", url: "https://www.linkedin.com/in/jimmy-cj-huang/" },
    { name: "mail",     url: "mailto:pocper1@gmail.com" },
  ],
  shareLinks: [
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});