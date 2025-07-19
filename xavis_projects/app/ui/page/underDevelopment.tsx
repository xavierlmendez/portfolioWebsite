'use client'

interface UnderDevelopmentProps {
    message?: string
}

export function UnderDevelopment({ message }: UnderDevelopmentProps) {
    return (
        <div className='w-full max-w-3xl flex flex-col items-center justify-center'>
                <img
                    src='/under_construction.svg'
                    alt='Under construction'
                    className='mx-auto opacity-80'
                />
            <h2 className='text-2xl font-semibold text-gray-200 mt-4 mb-2'>Under Development</h2>
            <p className='text-gray-400 text-center max-w-md'>
                {message ||
                    'This page is being built right now! Check back soon for updates.'}
            </p>
        </div>
    )
}