'use client'

interface StatusBadgeProps {
  status: 'Experimental' | 'Stable' | 'In Progress'
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const baseStyle = 'text-xs font-semibold px-3 py-1 rounded-full inline-block'
  const statusStyles: Record<string, string> = {
    Experimental: 'bg-yellow-100 text-yellow-800',
    Stable: 'bg-green-100 text-green-800',
    'In Progress': 'bg-blue-100 text-blue-800',
  }

  return (
    <span className={`${baseStyle} ${statusStyles[status]}`}>
      {status}
    </span>
  )
}