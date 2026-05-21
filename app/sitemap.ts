import type { MetadataRoute } from "next";
import { getCaseStudies, getBlogs } from "../lib/cms/store";
import type { CaseStudyRecord, BlogRecord } from "../lib/cms/types";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://itchamps.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudies, blogs] = await Promise.all([
    getCaseStudies("public"),
    getBlogs("public"),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/case-studies`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blogs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/academy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((cs: CaseStudyRecord) => ({
    url: `${BASE_URL}/case-studies/${cs.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b: BlogRecord) => ({
    url: `${BASE_URL}/blogs/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...blogRoutes];
}
