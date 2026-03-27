import { MetadataRoute } from 'next'
import { getAllPostsMeta } from '@/lib/posts'

export const dynamic = 'force-static'

const getSiteUrl = () => {
  const url = process.env.NEXT_PUBLIC_SITE_URL
  if (!url) return 'https://example.com'
  return url.startsWith('http') ? url : `http://${url}`
}

const SITE_URL = getSiteUrl()

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostsMeta()

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...postEntries,
  ]
}
