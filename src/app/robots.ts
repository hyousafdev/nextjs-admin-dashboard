import type { MetadataRoute } from "next";

// This is a private admin app, so search engines should not crawl it.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}