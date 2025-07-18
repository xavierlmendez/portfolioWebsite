import { ProjectOverview } from '@/app/ui/projects/GuineaPigProjects/projectOverview';
import { getUpdates } from '@/app/lib/updates'
import { Update } from '@/app/ui/update'


export default async function Projects() {
  const projectInformation = [
    {
      title: 'Guinea Pig Projects',
      description:
        'A collection of modular, skeleton projects designed to quickly prototype and showcase backend-first implementations with new technologies. Serves as a sandbox for learning, experimentation, and template generation across different stacks.',
      link: '/projects/guineaPigProjects',
      tags: ['Template', 'Prototype', 'Learning', 'Backend', 'Sandbox'],
    },
    {
      title: 'Watchlist Tracker',
      description:
        'A streamlined tool for monitoring selected stock tickers, visualizing real-time market data, and tracking personalized watchlists. Includes dynamic price updates, indicator tracking, and trend visualization.',
      link: '/projects/watchList',
      tags: ['Finance', 'Stocks', 'Real-time', 'Dashboard', 'Data Viz'],
    },
    {
      title: 'Real-time Alerts',
      description:
        'An automated system for delivering SMS alerts to users when specified stock price conditions or signals are met. Features customizable alert thresholds, instant notification delivery, and integration with watchlists for hands-off market monitoring.',
      link: '/projects/stock/real-time-alerts',
      tags: ['Finance', 'Stocks', 'Alerts', 'SMS', 'Automation'],
    },
    {
      title: 'Strategy Backtester',
      description:
        'A flexible environment for simulating and visualizing trading strategies over historical stock market data. Supports custom rule creation, performance analytics, and side-by-side comparison of multiple strategies to inform real-world trading decisions.',
      link: '/projects/stock/strategy-backtester',
      tags: ['Finance', 'Stocks', 'Strategy', 'Backtesting', 'Analytics', 'Visualization'],
    },
    {
      title: 'Sentiment Analyzer',
      description:
        'A toolkit for webscraping financial news and social media sources, performing sentiment analysis, and surfacing actionable insights. Enables correlation of market sentiment with price movements, supporting more informed investment decisions.',
      link: '/projects/stock/sentiment-analyzer',
      tags: ['NLP', 'Sentiment Analysis', 'Webscraping', 'Finance', 'Data Science'],
    }
  ];
  return (
    <main className='w-full min-h-screen flex flex-col items-center px-4 py-8'>
      <section id='header' className='w-full max-w-3xl mb-8 text-center'>
        <h1 className='text-4xl font-bold text-white mb-2'>About Xavi&apos;s Projects</h1>
      </section>
      {projectInformation.map((project) => (
        <ProjectOverview key={project.title} update={project} />
      ))}
    </main>
  )
}