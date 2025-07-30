'use client'

import { Header } from '../ui/page/header'
import Image from 'next/image'

export default function SupportPage() {
  const pageTitle = 'Support This Project'

  const supportIntro =
    'This site is a self-funded playground for learning, building, and sharing backend-first experiments with the developer community. ' +
    'If something here helped you learn, saved you time, or sparked an idea—consider supporting future builds.'

  const supportReasons = [
    {
      title: 'Fuel Future Projects',
      text: 'Tips help cover hosting, domain costs, and time spent developing guinea pig projects and open-source templates.',
    },
    {
      title: 'Vote With Coffee ☕',
      text: 'If a project or concept resonated with you, this is a simple way to say thanks and cast a "build more like this" vote.',
    },
    {
      title: 'Keep It Open',
      text: 'Contributions support keeping this space experimental, honest, and open—not locked behind paywalls or ad clutter.',
    },
  ]

  const supportLinks = [
    {
      name: 'Buy Me a Coffee',
      url: 'https://www.buymeacoffee.com/xavi.dev',
    },
    {
      name: 'PayPal',
      url: 'https://www.paypal.me/xaviermendez',
    },
    {
      name: 'GitHub Sponsors',
      url: 'https://github.com/sponsors/xaviermendez',
    },
  ]

  return (
    <main className='w-full min-h-screen flex flex-col items-center px-4 py-8'>
      <Header title={pageTitle} description={supportIntro} />

      <section className='w-full max-w-4xl mb-8 grid md:grid-cols-3 gap-4'>
        {supportReasons.map((reason) => (
          <div key={reason.title} className='bg-gray-900 p-4 rounded-2xl shadow-md'>
            <h3 className='text-lg font-semibold text-white mb-2'>{reason.title}</h3>
            <p className='text-gray-300 text-sm'>{reason.text}</p>
          </div>
        ))}
      </section>

      <section className='w-full max-w-4xl bg-gray-900 rounded-2xl shadow-md p-6 mb-8 text-center'>
        <h2 className='text-2xl font-semibold mb-4 text-white'>Ways to Support ☕</h2>
        <div className='flex flex-col sm:flex-row justify-center gap-4'>
          {supportLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target='_blank'
              rel='noopener noreferrer'
              className='bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow'
            >
              {link.name}
            </a>
          ))}
        </div>
      </section>

      <section className='w-full max-w-4xl flex justify-center'>
        <Image
          src='/public/coffee_support.svg'
          alt='Coffee cup illustration'
          width={300}
          height={300}
          className='opacity-80'
        />
      </section>
    </main>
  )
}