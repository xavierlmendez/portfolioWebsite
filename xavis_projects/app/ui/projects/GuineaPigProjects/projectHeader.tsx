'use client'

import { StatusBadge } from './statusBadge';

interface ProjectHeaderProps {
  title: string
  description: string
  status: 'Experimental' | 'Stable' | 'In Progress'
}

export function ProjectHeader({ title, description, status }: ProjectHeaderProps) {
  return (
    <header className="mb-6 border-b border-gray-200 pb-4">
      <div className="border p-4 rounded-xl shadow-md mb-4 hover:shadow-lg transition-all bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
      <p className="text-gray-600 text-lg mb-3">{description}</p>
      <StatusBadge status={status} />
      </div>
    </header>
  )
}