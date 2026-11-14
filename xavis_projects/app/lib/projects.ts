export type ProjectStatus = 'Live' | 'In Development' | 'Exploring' | 'Planned';

export interface Project {
  id: string;
  name: string;
  // Optional only for entries that have never been given a status.
  status?: ProjectStatus;
  href: string;
  description: string;
  tags: string[];
  group?: 'guineaPig';
}

export const projects: Project[] = [
  {
    id: 'guineaPigProjects',
    name: 'Guinea Pig Projects',
    status: 'Live',
    href: '/projects/guineaPigProjects',
    description:
      'A collection of modular, skeleton projects designed to quickly prototype and showcase backend-first implementations with new technologies. Serves as a sandbox for learning, experimentation, and template generation across different stacks.',
    tags: ['Template', 'Prototype', 'Learning', 'Backend', 'Sandbox'],
  },
  {
    id: 'watchList',
    name: 'Stock Watchlist',
    status: 'In Development',
    href: '/projects/watchList',
    description:
      'A streamlined tool for monitoring selected stock tickers, visualizing real-time market data, and tracking personalized watchlists. Includes dynamic price updates, indicator tracking, and trend visualization.',
    tags: ['Finance', 'Stocks', 'Real-time', 'Dashboard', 'Data Viz'],
  },
  {
    id: 'strategyBacktester',
    name: 'Strategy Backtester',
    status: 'In Development',
    href: '/projects/strategyBacktester',
    description:
      'A flexible environment for simulating and visualizing trading strategies over historical stock market data. Supports custom rule creation, performance analytics, and side-by-side comparison of multiple strategies to inform real-world trading decisions.',
    tags: ['Finance', 'Stocks', 'Strategy', 'Backtesting', 'Analytics', 'Visualization'],
  },
  {
    id: 'botMaker',
    name: 'Bot Maker',
    status: 'In Development',
    href: '/projects/botMaker',
    description:
      'An interactive platform for building, training, and evaluating machine learning models directly through a web interface. Users can import data, auto-classify problem types, visualize model performance, and experiment with algorithms in real time. Designed as a dynamic frontend-to-backend integration demo within the portfolio.',
    tags: ['Machine Learning', 'Data Visualization', 'Interactive', 'Frontend-Backend', 'AI Tools'],
  },
  {
    id: 'alerts',
    name: 'Real-Time Alerts',
    status: 'Exploring',
    href: '/projects/alerts',
    description:
      'An automated system for delivering SMS alerts to users when specified stock price conditions or signals are met. Features customizable alert thresholds, instant notification delivery, and integration with watchlists for hands-off market monitoring.',
    tags: ['Finance', 'Stocks', 'Alerts', 'SMS', 'Automation'],
  },
  {
    id: 'chartBuilder',
    name: 'Chart Builder',
    href: '/projects/guineaPigProjects/chartBuilder',
    description:
      'A flexible experimental UI for plotting coordinate data, generating trendlines, and testing custom chart types. Designed as a guinea pig environment for future BotMaker and Strategy Backtester project visualizations and interactive data models.',
    tags: ['Charts', 'Data Viz', 'Regression', 'Guinea Pig'],
    group: 'guineaPig',
  },
  {
    id: 'smsInterfaceWrapper',
    name: 'Text Message Service Interface',
    status: 'Exploring',
    href: '/projects/guineaPigProjects/smsInterfaceWrapper',
    description:
      'A frontend dashboard for sending and receiving SMS via a backend messaging API. Features message logs, delivery status tracking, and quick-reply templates.',
    tags: ['Messaging', 'SMS', 'API Wrapper', 'Frontend for Backend'],
    group: 'guineaPig',
  },
  {
    id: 'sentimentAnalyzer',
    name: 'Sentiment Analyzer',
    status: 'Planned',
    href: '/projects/sentimentAnalyzer',
    description:
      'A toolkit for webscraping financial news and social media sources, performing sentiment analysis, and surfacing actionable insights. Enables correlation of market sentiment with price movements, supporting more informed investment decisions.',
    tags: ['NLP', 'Sentiment Analysis', 'Webscraping', 'Finance', 'Data Science'],
  },
  {
    id: 'clusteringTestImages',
    name: 'Clustering Test Images',
    status: 'Live',
    href: '/projects/clusteringTestImages',
    description:
      'A small set of high-resolution landscape photographs (Oregon hiking trip, iPhone HEIC originals) published as a clean test set for graph-clustering and image-segmentation experiments. Includes lossless PNG exports at full and reduced sizes, a manifest with per-image statistics, and checksums.',
    tags: ['Research', 'Dataset', 'Clustering', 'Image Segmentation', 'Download'],
  },
];

/** Top-level projects (not part of a group): Projects page and nav menu. Each must have a status. */
export const topLevelProjects = projects
  .filter((p) => !p.group)
  .map((p): Project & { status: ProjectStatus } => {
    if (p.status === undefined) {
      throw new Error(`Top-level project "${p.id}" has no status`);
    }
    return { ...p, status: p.status };
  });

/** Projects listed on the Guinea Pig Projects page. */
export const guineaPigProjects = projects.filter((p) => p.group === 'guineaPig');

/** Projects shown as status cards on Home and About: every project with a status, minus the Guinea Pig container. */
export const showcaseProjects = projects.filter(
  (p): p is Project & { status: ProjectStatus } => p.status !== undefined && p.id !== 'guineaPigProjects',
);

/** Nav menu project entries: "Projects Home" followed by every top-level project. */
export const projectsList: { title: string; href: string; status: ProjectStatus }[] = [
  {
    title: 'Projects Home',
    href: '/projects',
    status: 'Live',
  },
  ...topLevelProjects.map((project) => ({
    title: project.name,
    href: project.href,
    status: project.status,
  })),
];
