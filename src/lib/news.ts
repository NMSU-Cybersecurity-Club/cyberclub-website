import { getCollection } from 'astro:content'

export interface NewsListItem {
  title: string
  description: string
  href: string
  date?: Date
  author?: string
}

interface MarkdownPageModule {
  url?: string
  frontmatter?: {
    title?: string
    description?: string
    date?: string | Date
    author?: string
    draft?: boolean
  }
}

export async function getPublishedNews() {
  const posts = await getCollection('news', ({ data }) => !data.draft)
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.id.localeCompare(b.id))
}

export function parseNewsDate(value?: string | Date): Date | undefined {
  if (!value) return undefined
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.valueOf()) ? undefined : date
}

export async function getAllNewsItems(): Promise<NewsListItem[]> {
  const collectionPosts = await getPublishedNews()
  const items: NewsListItem[] = collectionPosts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    href: `/news/${post.id}/`,
    date: post.data.date,
    author: post.data.author,
  }))

  const pageModules = import.meta.glob<MarkdownPageModule>('../pages/news/**/*.md', { eager: true })
  for (const [path, mod] of Object.entries(pageModules)) {
    const fm = mod.frontmatter
    if (!fm || fm.draft || !fm.title) continue

    const fallbackSlug = path.replace(/^.*\/pages\/news\//, '').replace(/\.md$/, '')
    const href = mod.url ? (mod.url.endsWith('/') ? mod.url : `${mod.url}/`) : `/news/${fallbackSlug}/`

    items.push({
      title: fm.title,
      description: fm.description ?? '',
      href,
      date: parseNewsDate(fm.date),
      author: fm.author,
    })
  }

  return items.sort(
    (a, b) => (b.date?.valueOf() ?? 0) - (a.date?.valueOf() ?? 0) || a.title.localeCompare(b.title),
  )
}

export function formatNewsDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(date)
}
