export default function CourseAiFrameworkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="w-full max-w-4xl">
      <div className="rounded-l bg-[#1E293B] shadow-xl p-8">
        {children}
      </div>
    </section>
  )
}
