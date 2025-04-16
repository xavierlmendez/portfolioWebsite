export default function stockLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>
        <div>stock inner options bar here</div>
        <div className="p-8">
            {children}
        </div>
    </section>
}