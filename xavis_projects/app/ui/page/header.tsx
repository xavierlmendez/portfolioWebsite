'use client'


interface HeaderProps {
  title: string
  description: string
  tooltip?: React.ReactNode
}

export function Header({ title, description, tooltip }: HeaderProps) {

  const goBack = () => {
    if (typeof window === 'undefined') return

    const path = window.location.pathname
    const segments = path.split('/').filter(Boolean)

    if (segments.length <= 1) {
      window.location.assign('/')
      return
    }

    const parentPath = '/' + segments.slice(0, -1).join('/')
    window.location.assign(parentPath)
  }

  return (
    <header id="header" className="w-full mb-8">
      <div className="grid grid-cols-[auto,1fr,auto] items-center">
        {/* Left: Back */}
        <div className="justify-self-start">
          <button
            type="button"
            onClick={goBack}
            className="ml-2 inline-flex items-center gap-2 rounded-lg bg-black/80 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-white hover:text-black"
            aria-label="Go back"
          >
            ← Back
          </button>
        </div>

        <div className="flex items-center justify-center gap-2">
          <h1 className="text-4xl font-bold text-white">{title}</h1>
          {tooltip ?? null}
        </div>

      </div>

      <p className="mt-2 text-center text-lg text-gray-300">
        {description}
      </p>
    </header>
  )
}