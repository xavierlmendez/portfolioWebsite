export default function BotMakerLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>
        <div>botMaker inner options bar here</div>
        <div className="rounded-l bg-[#1E293B] shadow-xl p-8">
            {children}
        </div>
    </section>
}