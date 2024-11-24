import React from 'react';

import { useState } from 'react'
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "./ui/card"

import { Database, Terminal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

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
    url = "https://example.com"
    result = client.crawl(url)
    print(f"Title: {result.metadata.get('title')}")
    print(f"Content:\\n{result.markdown}")
except APIError as e:
    print(f"Error: {e}")

# Crawl a website
try:
    results = client.crawl("https://example.com", max_pages=10, max_depth=2)
    for result in results:
        print(f"URL: {result.url}")
        print(f"Content: {result.markdown[:100]}...")  # Show first 100 chars
except APIError as e:
    print(f"Error: {e}")`,
  curl: `# Scrape a single URL
curl -X POST https://api.scrapester.com/v1/scrape \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com"
  }'

# Response will contain the scraped content in Markdown format
# ...

# For crawling, use the /crawl endpoint with additional parameters
# ...`
}

export function CodeDisplay({ user }) {
  const [selectedLanguage, setSelectedLanguage] = useState('nodejs')
  const navigate = useNavigate()

  const handleTryItClick = () => {
    if (user) {
      navigate('/playground');
    } else {
      navigate('/login');
    }
  }

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
          <code className="text-sm">
            {codeSnippets[selectedLanguage].split('\n').map((line, index) => {
              if (line.trim().startsWith('import') || line.trim().startsWith('from')) {
                return <span key={index} className="block text-purple-400">{line}</span>;
              } else if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
                return <span key={index} className="block text-green-400">{line}</span>;
              } else if (line.includes('try') || line.includes('catch') || line.includes('except')) {
                return <span key={index} className="block text-yellow-300">{line}</span>;
              } else if (line.includes('console.log') || line.includes('print')) {
                return <span key={index} className="block text-blue-300">{line}</span>;
              } else {
                return <span key={index} className="block text-gray-300">{line}</span>;
              }
            })}
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
        <Button onClick={handleTryItClick}>
          <Terminal className="mr-2 h-4 w-4" />
          Try it out
        </Button>
      </CardFooter>
    </Card>
  )
}

