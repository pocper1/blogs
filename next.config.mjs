import createMDX from '@next/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
  theme: {
    dark: 'github-dark-dimmed',
    light: 'github-light',
  },
  keepBackground: true,
  defaultLang: 'plaintext',
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkFrontmatter],
    rehypePlugins: [
      // rehypeSlug adds id="" to headings — required for anchor links
      rehypeSlug,
      // rehypeAutolinkHeadings is intentionally omitted:
      // mdx-components.tsx h2/h3 overrides already add the hover-# anchor link,
      // so using both would create nested <a> hydration errors.
      [rehypePrettyCode, prettyCodeOptions],
    ],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  outputFileTracingRoot: process.cwd(),
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default withMDX(nextConfig)
