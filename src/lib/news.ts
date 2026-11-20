import { getCollection } from 'astro:content'

export async function getPublishedNews() {
  const posts = await getCollection('news', ({ data }) => !data.draft)
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.id.localeCompare(b.id))
}

export function formatNewsDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(date)
}

export function parseNewsDate(value?: string | Date): Date | undefined {
  if (!value) return undefined
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.valueOf()) ? undefined : date
}
