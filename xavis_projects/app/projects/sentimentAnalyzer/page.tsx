'use client'

import { Header } from '../../ui/page/header';
import { UnderDevelopment } from '../../ui/page/underDevelopment';

export default function LinksPage() {

  const pageTitle = 'Sentiment Analyzer';

  return (
    <main className='w-full min-h-screen'>
      <Header title={pageTitle} description={''} />
      <UnderDevelopment message='' />
    </main>
  )
}
