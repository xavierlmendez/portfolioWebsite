export default function projectsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
    <div className='w-full min-h-screen flex flex-col items-center px-8 py-8 bg-[#000000] rounded-xl'>
            {children}
    </div>
    )
}