import { getHomeRoute } from '@/app/lib/projectUtils/botMaker/botMakerConnect'
import { Header } from '@/app/ui/page/header';

export default async function BotBrain() {
  const [beStatus] = await Promise.all([getHomeRoute()]);

  const pageTitle = '🧠 BotMaker 🧠'
  const pageDescription = 'Visualization and experimentation interface for demonstrating a custom-built machine learning library.'

  return (
    <div >
      <Header title={pageTitle} description={pageDescription} />
      <div className='w-full min-h-screen text-gray-200 p-8 md:p-12 space-y-10'>

      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold text-amber-400'>Project State</h2>
        <p>
          The <strong className='text-white'>BotMaker Frontend</strong> is currently under development. 
          It will serve as a visual playground where users can upload CSV data 
          (labeled or unlabeled) and observe how different machine learning models 
          learn and classify data in real time through <strong>2D and 3D visualizations</strong>.
        </p>
        <p>
          The selected dimensions in each visualization will correspond to the 
          <strong className='text-white'> most important features</strong> identified by the model. 
          Users will also be able to interact with graphs, switch between models, 
          and explore different feature combinations.
        </p>
      </section>

      <section className='space-y-3'>
        <h2 className='text-2xl font-semibold text-blue-300'>Project Intent</h2>
        <ul className='list-disc pl-6 space-y-1 text-gray-300'>
          <li>Allow users to upload CSV datasets (labeled or unlabeled).</li>
          <li>Enable selection of machine learning models (Perceptron, Regression, etc.).</li>
          <li>Visualize model learning progress in both 2D and 3D environments.</li>
          <li>Highlight most important features for chosen visualizations.</li>
          <li>Offer real-time feedback and interactivity during training.</li>
        </ul>
      </section>

      <section className='space-y-3'>
        <h2 className='text-2xl font-semibold text-amber-400'>✅ Functional Requirements</h2>
        <ul className='list-disc pl-6 space-y-1 text-gray-300'>
          <li>CSV import with automatic data parsing and validation.</li>
          <li>Model selection and parameter configuration interface.</li>
          <li>Dynamic 2D and 3D graph generation with interactive controls.</li>
          <li>Feature importance analysis for axis selection.</li>
          <li>Backend integration for training and evaluation updates.</li>
          <li>Display of accuracy, loss, and model progress metrics.</li>
          <li>Backend connectivity and health monitoring (see below).</li>
        </ul>
      </section>

      <section className='space-y-3'>
        <h2 className='text-2xl font-semibold text-blue-300'>⚙️ Non-Functional Requirements</h2>
        <ul className='list-disc pl-6 space-y-1 text-gray-300'>
          <li>Responsive and intuitive UI using React + Tailwind CSS.</li>
          <li>Robust state management for models and visual data.</li>
          <li>Scalable modular design for easy model extension.</li>
          <li>Clear feedback on loading, errors, and data processing.</li>
          <li>Secure client-side handling of user-uploaded data.</li>
          <li>Modern, cohesive visual design matching <span className='text-amber-400'>xavisprojects.com</span>.</li>
        </ul>
      </section>

      <section className='border-t border-gray-700 pt-4'>
        <h2 className='text-2xl font-semibold text-amber-400'>🧩 Backend Status</h2>
        <p className='text-gray-300'>
          <strong className='text-white'>Current Status:</strong>{' '}
          <span className='font-mono text-blue-300'>{beStatus}</span>
        </p>
      </section>

      <footer className='border-t border-gray-700 pt-6 text-sm text-gray-500'>
        <p>
          🚧 This page is a work in progress. Functionality and interactivity will be added 
          as the ML visualization components and backend API integrations are completed.
        </p>
      </footer>
      </div>
    </div>
  )
}
