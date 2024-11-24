'use client'

import { Download, Copy } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'

export function CrawlResults({ data }) {
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
          Pages Scraped: {data.totalPages}
        </h2>
        <Button 
          variant="outline" 
          onClick={handleDownload}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download Results JSON
        </Button>
      </div>

      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
        {data.pages.map((page, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">URL: {page.url}</h3>
              <Tabs defaultValue="markdown" className="w-full">
                <TabsList>
                  <TabsTrigger value="markdown">Markdown</TabsTrigger>
                  <TabsTrigger value="json">JSON</TabsTrigger>
                </TabsList>
                <TabsContent value="markdown">
                  <div className="relative">
                    <pre className="bg-secondary p-4 rounded-md overflow-x-auto">
                      <code className="text-sm">{page.markdown}</code>
                    </pre>
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
                <TabsContent value="json">
                  <div className="relative">
                    <pre className="bg-secondary p-4 rounded-md overflow-x-auto">
                      <code className="text-sm">{JSON.stringify(page.json, null, 2)}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => handleCopy(JSON.stringify(page.json, null, 2))}
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