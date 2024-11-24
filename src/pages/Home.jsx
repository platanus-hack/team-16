/* eslint-disable jsx-a11y/anchor-is-valid */

import { useNavigate } from 'react-router-dom';

const { GithubIcon, Globe, Terminal, Zap, Shield, Code, Database, Coffee } = require('lucide-react');
const { Button } = require('../components/ui/button');
const { Input } = require('../components/ui/input');
const { Card, CardContent, CardFooter } = require('../components/ui/card');


export default function Home() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
      navigate('/login');
    };
      
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-8 md:py-16 space-y-16">
        {/* Hero Section */}
        <header className="text-center space-y-6">
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
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
          <Card className="p-6 hover:shadow-lg hover:shadow-[#574a90] transition-shadow">
            <Zap className="h-12 w-12 text-[#574a90] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Minimize Tokens</h3>
            <p className="text-muted-foreground">
              Blazing fast performance with concurrent scraping and automatic rate limiting.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg hover:shadow-[#574a90] transition-shadow">
            <Shield className="h-12 w-12 text-[#574a90] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Faster Inferences</h3>
            <p className="text-muted-foreground">
              Automatic proxy rotation and user-agent switching to avoid blocks.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg hover:shadow-[#574a90] transition-shadow">
            <Code className="h-12 w-12 text-[#574a90] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Semantic Coherence</h3>
            <p className="text-muted-foreground">
            Ensure that related tokens are grouped together improving your outcome.
            </p>
          </Card>
        </section>

        {/* Code Example */}
        <Card className="max-w-3xl mx-auto">
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Quick Start</h2>
                <code className="relative rounded bg-muted px-4 py-1 font-mono text-sm">
                  npm install scrapester
                </code>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Example Usage
              </h3>
              <pre className="rounded-lg bg-gray-900 text-gray-100 p-4 overflow-x-auto">
                <code className="font-mono text-sm">
                  {`import { Scrapester } from 'scrapester';

// Initialize the scraper with options
const scraper = new Scrapester({
  concurrency: 2,
  timeout: 30000
});

// Start scraping with advanced features
const result = await scraper.get('https://example.com', {
  waitFor: '.content',
  extract: {
    title: 'h1',
    prices: '.price | numbers[]',
    images: 'img | attr:src[]'
  }
});

console.log(result.data);`}
                </code>
              </pre>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4 pt-6">
            <Button asChild onClick={handleGetStarted}>
              <a href="https://docs.scrapester.lol/quickstart" target="_blank" rel="noopener noreferrer" className="gap-2">
                <Code className="h-4 w-4" />
                Get Started
              </a>
            </Button>
            <Button variant="outline" className=" gap-2 text-sm hover:bg-[#574a90] dark:hover:bg-[#574a90] hover:text-white transition-colors" asChild>
              <a href="https://docs.scrapester.lol" target="_blank" rel="noopener noreferrer" className="gap-2">
                <Database className="h-4 w-4" />
                Read our docs
              </a>
            </Button>
          </CardFooter>
        </Card>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
          <div className="text-center">
            <h4 className="text-4xl font-bold">10k+</h4>
            <p className="text-muted-foreground">Downloads</p>
          </div>
          <div className="text-center">
            <h4 className="text-4xl font-bold">99%</h4>
            <p className="text-muted-foreground">Success Rate</p>
          </div>
          <div className="text-center">
            <h4 className="text-4xl font-bold">50ms</h4>
            <p className="text-muted-foreground">Avg. Response</p>
          </div>
          <div className="text-center">
            <h4 className="text-4xl font-bold">4.9★</h4>
            <p className="text-muted-foreground">Rating</p>
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
                Making web scraping accessible and efficient for everyone.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Documentation</h5>
              <ul className="space-y-2">
                <li>
                  <a href="/docs/quickstart" className="text-sm text-muted-foreground hover:text-foreground">
                    Quick Start
                  </a>
                </li>
                <li>
                  <a href="/docs/api" className="text-sm text-muted-foreground hover:text-foreground">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="/docs/examples" className="text-sm text-muted-foreground hover:text-foreground">
                    Examples
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Community</h5>
              <ul className="space-y-2">
                <li>
                  <a href="https://github.com/yourusername/scrapester" className="text-sm text-muted-foreground hover:text-foreground">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="/discord" className="text-sm text-muted-foreground hover:text-foreground">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="/twitter" className="text-sm text-muted-foreground hover:text-foreground">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2">
                <li>
                  <a href="/support" className="text-sm text-muted-foreground hover:text-foreground">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="/status" className="text-sm text-muted-foreground hover:text-foreground">
                    Status
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
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
                href="https://github.com/yourusername/scrapester"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/scrapester"
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