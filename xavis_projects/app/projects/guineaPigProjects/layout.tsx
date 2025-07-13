export default function BotBrainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>
        <div className='rounded-l bg-[#1E293B] shadow-xl p-8'>
            {children}
        </div>
    </section>
}