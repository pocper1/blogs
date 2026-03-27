export type Lang = 'zh' | 'en'

export const dict = {
  en: {
    // nav
    'nav.posts':  'Posts',
    'nav.about':  'About',
    'nav.rss':    'RSS Feed',
    // home
    'home.hero.greeting':  "Hi, I'm",
    'home.hero.role':      'Software Engineer',
    'home.hero.bio':       'I write about TypeScript, DevOps, and building things on the web.',
    'home.hero.cta.posts': 'Read Posts',
    'home.hero.cta.about': 'About Me',
    'home.posts.title':       'All Posts',
    'home.posts.filter':      'Filter by tag',
    'home.posts.filterByTag': 'Filter by tag',
    'home.posts.filterByYear':'Filter by year',
    'home.posts.clearFilter': 'Clear filters',
    'home.posts.empty':       'No posts yet. Check back soon.',
    // about
    'about.title':         'About Me',
    'about.bio.title':     'Bio',
    'about.skills.title':  'Tech Stack',
    'about.resume.title':  'Résumé',
    'about.resume.lang.zh': '中文版',
    'about.resume.lang.en': 'English',
    'about.resume.download': 'Download PDF',
    'about.resume.hint':   'Set your Google Drive file IDs in src/app/about/page.tsx',
    'about.contact.title': 'Contact',
    // post
    'post.back':           'All Posts',
    'post.toc':            'On This Page',
    'post.related':        'Related Posts',
    'post.nav.prev':       'Previous',
    'post.nav.next':       'Next',
  },
  zh: {
    'nav.posts':  '文章',
    'nav.about':  '關於我',
    'nav.rss':    'RSS 訂閱',
    'home.hero.greeting':  '你好，我是',
    'home.hero.role':      '軟體工程師',
    'home.hero.bio':       '我寫關於 TypeScript、DevOps 以及各種 Web 開發的文章。',
    'home.hero.cta.posts': '瀏覽文章',
    'home.hero.cta.about': '關於我',
    'home.posts.title':       '所有文章',
    'home.posts.filter':      '依標籤篩選',
    'home.posts.filterByTag': '依標籤篩選',
    'home.posts.filterByYear':'依年份篩選',
    'home.posts.clearFilter': '清除篩選',
    'home.posts.empty':       '目前還沒有文章，敬請期待。',
    'about.title':         '關於我',
    'about.bio.title':     '自我介紹',
    'about.skills.title':  '技術棧',
    'about.resume.title':  '履歷',
    'about.resume.lang.zh': '中文版',
    'about.resume.lang.en': 'English',
    'about.resume.download': '下載 PDF',
    'about.resume.hint':   '請在 src/app/about/page.tsx 填入您的 Google Drive 檔案 ID',
    'about.contact.title': '聯絡方式',
    'post.back':           '所有文章',
    'post.toc':            '本頁目錄',
    'post.related':        '相關文章',
    'post.nav.prev':       '上一篇',
    'post.nav.next':       '下一篇',
  },
} satisfies Record<Lang, Record<string, string>>

export function t(lang: Lang, key: keyof typeof dict.en): string {
  return dict[lang][key] ?? dict.en[key] ?? key
}
