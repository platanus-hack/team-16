/* eslint-disable jsx-a11y/anchor-is-valid */

import { useNavigate } from 'react-router-dom';
import { CodeDisplay } from '../components/CodeDisplay';

const { GithubIcon, Globe, Terminal, Zap, Shield, Code, Database } = require('lucide-react');
const { Button } = require('../components/ui/button');
const { Card, CardContent, CardFooter } = require('../components/ui/card');

const codeSnippets = {
  nodejs: `import { Scrapester } from '@scrapester/sdk'

const scraper = new Scrapester({
  apiKey: 'your-api-key'
})

const result = await scraper.scrape({
  url: 'https://example.com'
})`,
  python: `from scrapester import Scrapester

scraper = Scrapester(
    api_key='your-api-key'
)

result = scraper.scrape(
    url='https://example.com'
)`,
  curl: `curl -X POST 'https://api.scrapester.com/v1/scrape' \\
  -H 'Authorization: Bearer your-api-key' \\
  -H 'Content-Type: application/json' \\
  -d '{"url": "https://example.com"}'`
}

export default function Home() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
      navigate('/login');
    };
      
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 space-y-16">
        {/* Hero Section */}
        <header className="container mx-auto px-4 py-8 md:py-16 text-center space-y-6">
          <div className="flex justify-center">
            <img
              className="dark:invert "
              src="/LOGO.png"
              alt="Scrapester logo"
              width={180}
              height={38}
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 text-transparent bg-clip-text">
          Web Data Built for LLMs
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
           Transform websites into clean and structured data for your AI applications. Open source and developer-friendly.
          </p>
          <div className="flex justify-center gap-4 pt-4">
          <Button size="lg" className="gap-2" onClick={handleGetStarted}>
              <Terminal className="h-4 w-4" />
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline" className=" gap-2 text-sm hover:bg-[#574a90] dark:hover:bg-[#574a90] hover:text-white transition-colors"
              onClick={() => window.open('https://github.com/Bugsterapp/scrapester', '_blank')}
            >
              <GithubIcon className="h-4 w-4" />
              View on GitHub
            </Button>
          </div>
        </header>

        {/* Features Grid */}
        <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
          <Card className="p-6 hover:shadow-lg hover:shadow-[#574a90] transition-shadow">
            <img 
              src="/spidera.png" 
              alt="Minimize Tokens"
              className="h-12 w-12 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Minimize Tokens</h3>
            <p className="text-muted-foreground">
           Reduce token counts by half with Markdown. Eliminate the noise.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg hover:shadow-[#574a90] transition-shadow">
          <div className="flex justify-center items-center">
            <img 
              src="/spiderb.png" 
              alt="Faster Inference"
              className="h-12 w-12 mb-4"
            />
          </div>
            <h3 className="text-xl font-semibold mb-2">20% Faster Inferences</h3>
            <p className="text-muted-foreground">
             Speed up inference time by 20% with Markdown's structure.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg hover:shadow-[#574a90] transition-shadow">
          <img 
              src="/spiderc.png" 
              alt="Semantic Coherence"
              className="h-12 w-12 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Semantic Coherence</h3>
            <p className="text-muted-foreground">
            Ensure that related tokens are grouped together improving your outcome.
            </p>
          </Card>
        </section>

        {/* Integration Section - Full width */}
        <section className="relative py-24 overflow-hidden bg-gradient-to-br from-purple-700 via-blue-800 to-indigo-900">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40L40 0M0 0L40 40" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          <div className="container relative mx-auto px-4 z-10">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Integrate today
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-200">
                Enhance your applications with top-tier web scraping and crawling capabilities.
              </p>
            </div>
            <CodeDisplay />
          </div>
        </section>
      </main>

      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <img
                className="dark:invert h-8"
                src="/LOGO.png"
                alt="Scrapester logo"
              />
              <p className="text-sm text-muted-foreground">
              Web Data Built for LLMs.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Documentation</h5>
              <ul className="space-y-2">
                <li>
                  <a href="https://docs.scrapester.lol/quickstart" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
                    Quick Start
                  </a>
                </li>
                <li>
                  <a href="https://docs.scrapester.lol/sdks" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
                    SDKs
                  </a>
                </li>
                <li>
                  <a href="https://docs.scrapester.lol/api-reference/endpoint/crawl" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
                    API Reference
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Community</h5>
              <ul className="space-y-2">
                <li>
                  <a href="https://github.com/Bugsterapp/scrapester" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://bugster-workspace.slack.com/join/shared_invite/zt-2v7i63ald-i67efG8sotKkYzTA3Kax6w" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
                    Slack
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/bugsterapp" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:facundo@bugster.app" className="text-sm text-muted-foreground hover:text-foreground">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Built with ❤️ by Bugster Inc
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Bugsterapp/scrapester"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/bugsterapp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}