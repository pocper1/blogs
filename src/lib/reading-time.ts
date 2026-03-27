import readingTime from 'reading-time'

export function calculateReadingTime(content: string) {
  const stats = readingTime(content)
  return {
    text: stats.text,
    words: stats.words,
    minutes: stats.minutes,
  }
}
