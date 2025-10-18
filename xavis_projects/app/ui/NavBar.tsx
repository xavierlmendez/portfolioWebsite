import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <>
      <div className='w-full sticky top-0 z-50 bg-gradient-to-r bg-[#f07a05] shadow-lg backdrop-blur-md border-b border-white/20'>
        <div className='container mx-auto px-6 py-1.5 h-16.5 flex justify-between items-center'>

          <div id='logo' className='flex justify-between items-center h-full'>
            <Link  href='/' className='text-xl  pr-40 font-bold text-black hover:text-blue-600 transition'>
              Xavi&apos;s Projects
            </Link>

            <ul id='navLinks' className='hidden text-l md:flex items-center gap-x-8 text-black font-medium'>

              <li>
                <a target='_blank' rel='noopener noreferrer' href='https://xavi-codeco.com'
                  className='block px-4 py-2 hover:text-blue-600 transition'
                >
                  Xavi Code & Co
                </a>
              </li>

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
                  <Link
                    href='/projects'
                    className='block px-4 py-2 hover:text-blue-450'>
                    Projects
                  </Link>
                </div>

                <ul id='projectsDropdown' className='absolute left-0 top-full mt-0 hidden w-56 rounded-md bg-[#c25304] shadow-lg group-hover:block z-50 text-sm text-black'>
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
                      href='/projects/botMaker'
                      className='block px-4 py-2 hover:bg-gray-100'
                    >
                      BotMaker (back logged)
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/projects/watchList'
                      className='block px-4 py-2 hover:bg-gray-100'
                    >
                      Watch List Tracker (V1)
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/projects/alerts'
                      className='block px-4 py-2 hover:bg-gray-100'
                    >
                      Real-Time Alerts (back logged)
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/projects/strategyBacktester'
                      className='block px-4 py-2 hover:bg-gray-100'
                    >
                      Strategy Backtester (in progress)
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/projects/sentimentAnalyzer'
                      className='block px-4 py-2 hover:bg-gray-100'
                    >
                      Sentiment Analyzer (back logged)
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link
                  href='/resourcesAndBlog'
                  className='block px-4 py-2 hover:text-blue-600 transition'
                >
                  Resources &apos;n Blog
                </Link>
              </li>

              <li>
                <Link
                  href='/support'
                  className='block px-4 py-2 hover:text-blue-600 transition'
                >
                  Support This Project
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