'use client'


interface HeaderProps {
    title: string
    description: string
}

export function Header({ title, description }: HeaderProps) {
    return (
        <header id='header' className='w-full mb-8 text-center'>
            <h1 className='text-4xl font-bold text-white mb-2'>{title}</h1>
            <p className='text-lg text-gray-300'>{description}</p>
        </header>
    )
}