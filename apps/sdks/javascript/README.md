# scrapester
Turn any website into LLM structured data.

## Usage Example


import { ScrapesterApp } from 'scrapester';

const client = new ScrapesterApp('your-api-key');

// Scrape a single URL
const result = await client.scrape('https://example.com');
console.log(result.markdown);

// Crawl a website
const results = await client.crawl('https://example.com', {
  maxPages: 10,
  maxDepth: 2
});


