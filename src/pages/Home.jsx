const { GithubIcon, InfoIcon, Globe } = require('lucide-react');
const { Button } = require('../components/ui/button');
const { Card, CardContent, CardFooter } = require('../components/ui/card');

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-8 md:py-16 space-y-12">
        <header className="text-center space-y-4">
          <div className="flex justify-center">
            <img
              className="dark:invert"
              src="/LOGO.png"
              alt="Scrapester logo"
              width={180}
              height={38}
            //   style={{ width: '180px', height: '38px' }}
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Scrapester: Effortless Web Scraping
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A powerful and easy-to-use web scraping library for Node.js. Extract data from websites with minimal code and maximum efficiency.
          </p>
        </header>

        <Card className="max-w-3xl mx-auto">
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Quick Start</h2>
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                npm install scrapester
              </code>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Example Usage</h3>
              <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  {`import { Scrapester } from 'scrapester';

const scraper = new Scrapester();
const result = await scraper.get('https://example.com');
console.log(result.text);`}
                </code>
              </pre>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4 pt-6">
            <Button asChild>
              <a href="https://docs.scrapester.lol/quickstart" target="_blank" rel="noopener noreferrer">
                Get Started
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://docs.scrapester.lol" target="_blank" rel="noopener noreferrer">
                Read our docs
              </a>
            </Button>
          </CardFooter>
        </Card>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 flex flex-wrap items-center justify-center gap-6">
          <a
            href="https://docs.scrapester.lol/examples"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <InfoIcon className="h-4 w-4" />
            Examples
          </a>
          <a
            href="https://github.com/yourusername/scrapester"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
          <a
            href="https://docs.scrapester.lol"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Globe className="h-4 w-4" />
            Full Documentation →
          </a>
        </div>
      </footer>
    </div>
  );
}
