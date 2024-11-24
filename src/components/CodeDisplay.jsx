import React from 'react';

import { useState } from 'react'
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "./ui/card"

import { Database, Terminal } from 'lucide-react'

const codeSnippets = {
  nodejs: `import { ScrapesterApp } from 'scrapester';

// Initialize the client
const app = new ScrapesterApp('your-api-key');

// Scrape a single URL
try {
  const result = await app.scrape('https://example.com');
  console.log(result.markdown);
} catch (error) {
  if (error instanceof APIError) {
    console.error(\`API Error (\${error.statusCode}): \`, error.message);
  }
}

// Crawl a website
try {
  const results = await app.crawl('https://example.com', {
    maxPages: 10,
    maxDepth: 2
  });
  
  results.forEach(result => {
    console.log(\`URL: \${result.url}\`);
    console.log(\`Content: \${result.markdown}\`);
  });
} catch (error) {
  console.error('Crawling error:', error);
}`,
  python: `from scrapester.crawler import ScrapesterApp, APIError

client = ScrapesterApp(api_key="your-api-key")

# Scrape a single URL
try:
    url = "https://platan.us/"
    result = client.crawl(url)
    print(f"Title: {result.metadata.get('title')}")
    print(f"Content:\\n{result.markdown}")
except APIError as e:
    print(f"Error: {e}")

# Crawl a website
try:
    url = "https://platan.us/"
    result = client.crawl(url)
    print(f"{result}")
except APIError as e:
    print(f"Error: {e}")`,
  curl: `curl -X POST https://scrapester.bugster.app/v1/scrape \\
  -H "Authorization: Bearer platanus-hack" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://platan.us/"
  }'`
}

export function CodeDisplay() {
  const [selectedLanguage, setSelectedLanguage] = useState('nodejs')

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardContent className="p-6">
        <div className="flex gap-4 mb-4">
          <Button 
            variant={selectedLanguage === 'nodejs' ? "default" : "ghost"} 
            className={selectedLanguage === 'nodejs' ? "text-white" : "text-orange-400"}
            onClick={() => setSelectedLanguage('nodejs')}
          >
            Node.js
          </Button>
          <Button 
            variant={selectedLanguage === 'python' ? "default" : "ghost"} 
            className={selectedLanguage === 'python' ? "text-white" : "text-blue-400"}
            onClick={() => setSelectedLanguage('python')}
          >
            Python
          </Button>
          <Button 
            variant={selectedLanguage === 'curl' ? "default" : "ghost"} 
            className={selectedLanguage === 'curl' ? "text-white" : "text-green-400"}
            onClick={() => setSelectedLanguage('curl')}
          >
            cURL
          </Button>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto">
          <code className="text-sm text-white">
            {codeSnippets[selectedLanguage]}
          </code>
        </pre>
      </CardContent>
      <CardFooter className="flex justify-between p-6 border-t border-gray-700">
        <Button 
          variant="secondary"
          onClick={() => window.open('https://docs.scrapester.lol/quickstart', '_blank')}
        >
          <Database className="mr-2 h-4 w-4" />
          View Documentation
        </Button>
        <Button
          onClick={() => window.open('https://www.scrapester.lol/playground', '_blank')}
        >
          <Terminal className="mr-2 h-4 w-4" />
          Try it out
        </Button>
      </CardFooter>
    </Card>
  )
}

