'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { NavLinkComponent } from './NavLinkComponent';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className='w-full sticky top-0 z-50 pt-4'>
      <nav className="
    container
    mx-auto
    flex items-center justify-between
    h-16 px-2 md:px-6
    rounded-2xl
    bg-[#f07a05]/90
    backdrop-blur-lg
    border border-white/10
    shadow-lg
    transition-all
    duration-300
    hover:bg-[#f07a05]
  ">
        <div className='flex justify-between items-center h-full'>
          <Link
            href='/'
            className='text-xl font-extrabold tracking-tight text-black hover:text-white transition-colors'
          >
            Xavi&apos;s Projects
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className='md:hidden inline-flex h-10 w-10 items-center rounded-lg hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/30'
          aria-label='Toggle menu'
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Desktop nav */}
        <ul
          id='navLinks'
          className='hidden text-l md:flex items-center gap-x-8 text-black mr-10'
        >
          {navLinksList.map((navLink) => (<NavLinkComponent key={navLink.href} values={navLink} />))}
        </ul>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div className='md:hidden border-t border-black/10 bg-[#f07a05] rounded-md'>
          <ul className='px-4 py-2 space-y-1 text-base text-black'>
            <li>
              <a
                href='https://xavi-codeco.com'
                target='_blank'
                rel='noopener noreferrer'
                className='block px-3 py-2 rounded-md hover:bg-black/10'
              >
                Xavi Code & Co
              </a>
            </li>
            <li>
              <Link href='/about'
                className='block px-3 py-2 rounded-md hover:bg-black/10'
                onClick={() => setOpen(false)}
              >
                About
              </Link>
            </li>

            {/* Mobile 'Projects' collapses into a simple list */}
            <li className='pt-2'>
              <div className='px-3 pb-1 text-sm uppercase tracking-wide opacity-80'>
                Projects
              </div>
              <ul className='space-y-0.5'>
                {projectsList.map((project) => (
                  <li key={project.href}>
                    <Link
                      href={project.href}
                      className='block px-3 py-2 rounded-md hover:bg-black/10'
                      onClick={() => setOpen(false)}
                    >
                      {project.title}
                      {project.status !== 'Live' && (
                        <span className='ml-2 text-xs opacity-80'>({project.status})</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <Link
                href='/resourcesAndBlog'
                className='block px-3 py-2 rounded-md hover:bg-black/10'
                onClick={() => setOpen(false)}
              >
                Resources &apos;n Blog
              </Link>
            </li>
            <li>
              <Link href='/support'
                className='block px-3 py-2 rounded-md hover:bg-black/10'
                onClick={() => setOpen(false)}
              >
                Support This Project
              </Link>
            </li>
          </ul>
        </div>
      )}
      {/* TODO Create Mobile Sign Up View */}


    </header>
  );
}

export const navLinksList = [
  {
    title: 'Xavi Code & Co',
    href: 'https://xavi-codeco.com',
    isDropdown: false,
    target: '_blank',
  },
  {
    title: 'About',
    href: '/about',
    isDropdown: false,
    target: 'host',
  },
  {
    title: 'Projects',
    href: '/projects',
    isDropdown: true,
    target: 'host',
    dropdownList: [
      {
        title: 'Guinea Pig Projects',
        href: '/projects/guineaPigProjects',
        status: 'Live',
      },
      {
        title: 'AI Slop Game',
        href: 'https://pawnevolution.com',
        status: 'Live',
        target: '_blank',
      },
      {
        title: 'Watch List Tracker',
        href: '/projects/watchList',
        status: 'Live',
      },
      {
        title: 'Strategy Backtester',
        href: '/projects/strategyBacktester',
        status: 'In Dev',
      },
      {
        title: 'BotMaker',
        href: '/projects/botMaker',
        status: 'In Dev',
      },
      {
        title: 'Real-Time Alerts',
        href: '/projects/alerts',
        status: 'Back Logged',
      },
      {
        title: 'Sentiment Analyzer',
        href: '/projects/sentimentAnalyzer',
        status: 'Back Logged',
      },
    ],
  },
  {
    title: "Resources 'n Blog",
    href: '/resourcesAndBlog',
    isDropdown: false,
    target: 'host',
  },
  {
    title: 'Support This Project',
    href: '/support',
    isDropdown: false,
    target: 'host',
  },
];

export const projectsList = [
  {
    title: 'Guinea Pig Projects',
    href: '/projects/guineaPigProjects',
    status: 'Live',
  },
  {
    title: 'AI Slop Game',
    href: 'https://pawnevolution.com',
    status: 'Live',
    target: '_blank',
  },
  {
    title: 'Watch List Tracker',
    href: '/projects/watchList',
    status: 'Live',
  },
  {
    title: 'Strategy Backtester',
    href: '/projects/strategyBacktester',
    status: 'In Dev',
  },
  {
    title: 'BotMaker',
    href: '/projects/botMaker',
    status: 'In Dev',
  },
  {
    title: 'Real-Time Alerts',
    href: '/projects/alerts',
    status: 'Back Logged',
  },
  {
    title: 'Sentiment Analyzer',
    href: '/projects/sentimentAnalyzer',
    status: 'Back Logged',
  },
];