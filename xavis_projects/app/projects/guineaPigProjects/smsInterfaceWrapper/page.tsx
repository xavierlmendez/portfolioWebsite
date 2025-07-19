'use client'

import { Header } from '../../../ui/page/header';
import { UnderDevelopment } from '../../../ui/page/underDevelopment';

export default function LinksPage() {

  const pageTitle = 'Text Message Interface Wrapper';

  return (
    <main className='w-full min-h-screen flex flex-col items-center px-4 py-8'>
      <Header title={pageTitle} description={''} />
      <UnderDevelopment message='' />
    </main>
  )
}
