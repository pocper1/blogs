import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const getSiteUrl = () => {
  const url = process.env.NEXT_PUBLIC_SITE_URL
  if (!url) return 'https://example.com'
  return url.startsWith('http') ? url : `http://${url}`
}

const SITE_URL = getSiteUrl()

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
