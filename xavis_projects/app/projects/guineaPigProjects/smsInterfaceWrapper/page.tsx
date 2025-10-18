'use client'

import { TextForm } from '@/app/ui/projects/GuineaPigProjects/smsInterfaceWrapper/TextForm';
import { Header } from '../../../ui/page/header';

export default function SmsInterfaceWrapperPage() {

  const pageTitle = 'Text Message Interface Wrapper';
  const pageDescription ='Send custom SMS messages via our backend API.' +
  ' Enter a phone number and your message below to test the integration.';

  return (
    <>
      <Header title={pageTitle} description={pageDescription} />

      <div className='container mx-auto px-6 py-10'>
        <div className='max-w-lg mx-auto bg-gray-800 rounded-xl shadow-lg p-6'>
          <TextForm />
        </div>
      </div>
    </>
  )
}
