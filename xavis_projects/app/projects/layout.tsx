export default function projectsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
    <div className='w-full min-h-screen flex flex-col items-center px-4 py-8'>
            {children}
    </div>
    )
}