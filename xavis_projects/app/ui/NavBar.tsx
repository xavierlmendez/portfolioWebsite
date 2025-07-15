import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <>
      <div className='w-full sticky top-0 z-50 bg-gradient-to-r from-[#00F5D4] via-[#00FFF7] to-[#00E5FF] shadow-lg backdrop-blur-md border-b border-white/20'>
        <div className='container mx-auto px-6 h-20 flex justify-between items-center'>

          <div id='logo' className='flex justify-between items-center h-full'>
            <Link href='/' className='text-xl  pr-40 font-bold text-gray-800 hover:text-gray-600 transition'>
              Xavi&apos;s Projects
            </Link>

            <ul id='navLinks' className='hidden md:flex items-center gap-x-8 text-gray-700 font-medium'>
              <li>
                <Link
                  href='/about'
                  className='block px-4 py-2 hover:text-blue-600 transition'
                >
                  About
                </Link>
              </li>

              <li className='group relative cursor-pointer'>
                <div className='block px-4 py-2 hover:text-blue-600 transition'>
                  Projects
                </div>

                <ul id='projectsDropdown' className='absolute left-0 top-full mt-0 hidden w-56 rounded-md bg-white shadow-lg group-hover:block z-50 text-sm text-gray-700'>
                  <li>
                    <Link
                      href='/projects/guineaPigProjects'
                      className='block px-4 py-2 hover:bg-gray-100'
                    >
                      Guinea Pig Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/projects/watchList'
                      className='block px-4 py-2 hover:bg-gray-100'
                    >
                      Watchlist Tracker
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/projects/alerts'
                      className='block px-4 py-2 hover:bg-gray-100'
                    >
                      Real-Time Alerts
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/projects/strategy-backtest'
                      className='block px-4 py-2 hover:bg-gray-100'
                    >
                      Strategy Backtester
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/projects/sentiment'
                      className='block px-4 py-2 hover:bg-gray-100'
                    >
                      Sentiment Analyzer
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link
                  href='/connectedSites'
                  className='block px-4 py-2 hover:text-blue-600 transition'
                >
                  Links
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;