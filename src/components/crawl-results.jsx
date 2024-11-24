'use client'

import { Download, Copy, RefreshCw } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import ReactMarkdown from 'react-markdown'

export function CrawlResults({ data, onRetry }) {
  // Verificar si hay datos
  if (!data?.data?.length) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 min-h-[400px]">
        <p className="text-lg text-muted-foreground text-center">
          No pages were found during the crawl.
        </p>
        <Button 
          variant="outline"
          onClick={onRetry}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'scapester-crawl-results.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
           Pages Scraped: {data.stats.pages_crawled} 
        </h2>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            onClick={onRetry}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </Button>
          <Button 
            variant="outline"
            onClick={handleDownload}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Results JSON
          </Button>
        </div>
      </div>

      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
        {data.data.map((page, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">URL: {page.url}</h3>
              <Tabs defaultValue="markdown" className="w-full">
                <TabsList>
                  <TabsTrigger value="markdown">Markdown</TabsTrigger>
                  <TabsTrigger value="metadata">Metadata</TabsTrigger>
                </TabsList>
                <TabsContent value="markdown">
                  <div className="relative">
                    <div className="bg-secondary p-4 rounded-md overflow-x-auto">
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>{page.markdown}</ReactMarkdown>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => handleCopy(page.markdown)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="metadata">
                  <div className="relative">
                    <pre className="bg-secondary p-4 rounded-md overflow-x-auto">
                      <code className="text-sm">
                        {JSON.stringify({
                          url: page.url,
                          metadata: page.metadata,
                          timestamp: page.timestamp
                        }, null, 2)}
                      </code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => handleCopy(JSON.stringify(page.metadata, null, 2))}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}