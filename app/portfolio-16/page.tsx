import Portfolio, { type PortfolioItem } from '@/components/shadcn-studio/blocks/portfolio-16/portfolio-16'
import solutionsAppImg from '@/assets/images/solutions/solutions_app.webp'

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Vocdoni app',
    description: 'Set up a real election in minutes. No IT team, no paper, no expertise needed - just simple, verifiable voting for any organization.',
    link: '/app',
    imageUrl: solutionsAppImg,
    imageAlt: 'Vocdoni app interface mockups',
    backgroundColor: 'bg-green-600/10 dark:bg-green-400/10 hover:bg-green-600/20 dark:hover:bg-green-400/20',
    btnColor:
      'bg-green-600 text-white hover:bg-green-600 focus-visible:ring-green-600 dark:bg-green-400 dark:hover:bg-green-400 dark:focus-visible:ring-green-400'
  },
  {
    id: 2,
    title: 'Platform integration SDK',
    description: 'Add verifiable, anonymous voting directly into your own applications with our open-source tools. Your infrastructure, our secure protocol.',
    link: 'https://developer.vocdoni.io/sdk',
    imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/portfolio/image-77.png',
    imageAlt: 'Developer tools and API',
    backgroundColor: 'bg-sky-600/10 dark:bg-sky-400/10 hover:bg-sky-600/20 dark:hover:bg-sky-400/20',
    btnColor:
      'bg-sky-600 text-white hover:bg-sky-600 focus-visible:ring-sky-600 dark:bg-sky-400 dark:hover:bg-sky-400 dark:focus-visible:ring-sky-400'
  },
  {
    id: 3,
    title: 'Custom election projects',
    description: 'Full expert support for complex governance, from initial configuration to certified verifiable results.',
    link: '#',
    imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/portfolio/image-75.png',
    imageAlt: 'Data charts and project management',
    backgroundColor: 'bg-amber-600/10 dark:bg-amber-400/10 hover:bg-amber-600/20 dark:hover:bg-amber-400/20',
    btnColor:
      'bg-amber-600 text-white hover:bg-amber-600 focus-visible:ring-amber-600 dark:bg-amber-400 dark:hover:bg-amber-400 dark:focus-visible:ring-amber-400'
  },
  {
    id: 4,
    title: 'Voter census management',
    description: 'Easily manage voter rolls, define eligibility, and distribute access securely using robust authentication methods.',
    link: '#',
    imageUrl: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/portfolio/image-74.png',
    imageAlt: 'Identity verification and user management',
    backgroundColor: 'bg-red-600/10 dark:bg-red-400/10 hover:bg-red-600/20 dark:hover:bg-red-400/20',
    btnColor:
      'bg-red-600 text-white hover:bg-red-600 focus-visible:ring-red-600 dark:bg-red-400 dark:hover:bg-red-400 dark:focus-visible:ring-red-400'
  }
]

const PortfolioPage = () => {
  return <Portfolio portfolioItems={portfolioItems} />
}

export default PortfolioPage
