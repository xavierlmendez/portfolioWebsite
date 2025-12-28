'use client'

import Link from 'next/link'


interface dropdownValues {
    title: string,
    href: string,
    status: string,
    target?: string,
}

interface NavLinkComponent {
    title: string,
    href: string,
    isDropdown: boolean,
    target: string,
    dropdownList?: dropdownValues[]
}

export function NavLinkComponent({ values }: { values: NavLinkComponent }) {

    const confirmNavigation = (
        e: React.MouseEvent,
        message = 'Are you sure you want to leave this page?'
    ) => {
        const ok = window.confirm(message)
        if (!ok) {
            e.preventDefault()
            e.stopPropagation()
        }
    }


    if (values.isDropdown && values.dropdownList) {
        return (

            <li className='group relative cursor-pointer first:rounded-t-md last:rounded-b-md'>
                <div className='block px-4 py-2 text-l hover:text-blue-600 transition'>
                    <Link
                        href='/projects'
                        className='block px-4 py-2 hover:text-blue-450'>
                        Projects
                    </Link>
                    <ul
                        id='projectsDropdown'
                        className='absolute left-0 top-full mt-0 hidden w-56 rounded-md overflow-hidden 
             bg-[#f07a05]/95 shadow-lg group-hover:block z-50 text-sm text-black'
                    >
                        {values.dropdownList.map((project) => (
                            <li key={project.href}>
                                {project.target === '_blank' ? (
                                    <a
                                        href={project.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block px-4 py-2 bg-white hover:bg-gray-100 transition"
                                        onClick={(e) => {
                                            confirmNavigation(e, `Open "${project.href}" in a new tab?`)
                                        }}
                                    >
                                        {project.title}
                                        {project.status !== 'Live' && (
                                            <span className="text-xs text-gray-700 ml-1">
                                                ({project.status})
                                            </span>
                                        )}
                                    </a>
                                ) : (
                                    <Link
                                        href={project.href}
                                        className="block px-4 py-2 bg-white hover:bg-gray-100 transition"
                                    >
                                        {project.title}
                                        {project.status !== 'Live' && (
                                            <span className="text-xs text-gray-700 ml-1">
                                                ({project.status})
                                            </span>
                                        )}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </li>
        );
    }

    if (values.target === '_blank') {
        return (
            <li>
                <a
                    href={values.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                        confirmNavigation(e, `Open "${values.title}" in a new tab?`)
                    }}
                    className="block px-4 py-2 text-l hover:text-blue-600 transition"
                >
                    {values.title}
                </a>
            </li>
        )
    }

    return (
        <li>
            <Link href={values.href}
                className='block px-4 py-2 text-l hover:text-blue-600 transition'
            >
                {values.title}
            </Link>
        </li>
    );
}