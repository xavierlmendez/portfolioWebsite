'use client'

import Link from 'next/link'

interface ProjectOverviewProps {
  update: {
    title: string
    description: string
    link: string
    tags?: string[]
  }
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({ update }) => {
  return (
    <li className='list-none border p-4 rounded-xl shadow-md mb-4 hover:shadow-lg transition-all bg-white w-full'>
      <Link href={update.link}>
        <div>
          <h3 className='text-xl font-semibold text-blue-600 mb-2'>{update.title}</h3>
          <p className='text-gray-700 mb-2'>{update.description}</p>
          {update.tags && (
            <div className='flex gap-2 flex-wrap'>
              {update.tags.map((tag) => (
                <span
                  key={tag}
                  className='bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded'
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </li>
  )
}
