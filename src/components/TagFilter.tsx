import { TagBadge } from './TagBadge'

interface TagFilterProps {
  tags: Record<string, number>
}

export function TagFilter({ tags }: TagFilterProps) {
  const sorted = Object.entries(tags).sort((a, b) => b[1] - a[1])

  if (sorted.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {sorted.map(([tag, count]) => (
        <TagBadge key={tag} tag={tag} count={count} />
      ))}
    </div>
  )
}
