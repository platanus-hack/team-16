"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { PlaygroundOptions } from "../components/playground-options";
import { LoadingState } from "../components/loading-state";
import { CrawlResults } from "../components/crawl-results";
import { ToastProvider } from "../components/ui/toast";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { ScrapeResults } from "../components/scrape-results";
import { EmptyState } from "../components/common-options";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";

function isValidUrl(url) {
  if (!url) return false;

  try {
    const urlToCheck = url.startsWith("http") ? url : `https://${url}`;
    const urlObject = new URL(urlToCheck);
    return urlObject.hostname.includes(".");
  } catch (e) {
    return false;
  }
}

export const dynamic = "force-dynamic";

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState("scrape");
  const [isOptionsOpen, setIsOptionsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [scrapeResults, setScrapeResults] = useState(null);
  const [crawlResults, setCrawlResults] = useState(null);
  const [scrapeUrl, setScrapeUrl] = useState("");
  const [crawlUrl, setCrawlUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [crawlerOptions, setCrawlerOptions] = useState({
    max_pages: 4,
    max_depth: 2,
    timeout: 30000,
    extract_main: false,
    include_links: false
  });

  const handleTabChange = (value) => {
    setActiveTab(value);
    // setScrapeResults(null);
    // setCrawlResults(null);
  };

  const validateUrl = (url) => {
    if (!url) {
      setUrlError("Enter a URL to get started");
      return false;
    }
    if (!isValidUrl(url)) {
      setUrlError("Please enter a valid website URL (e.g., example.com)");
      return false;
    }
    setUrlError("");
    return true;
  };

  const handleCrawlerOptionChange = (key, value) => {
    setCrawlerOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleScrape = async () => {
    if (!validateUrl(scrapeUrl)) return;

    setIsLoading(true);
    setScrapeResults(null);

    try {
      const response = await fetch("https://scrapester.bugster.app/v1/scrape", {
        method: "POST",
        headers: {
          "Authorization": "Bearer platanus-hack",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "url": scrapeUrl
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Scrape response:", data);

      setIsLoading(false);
      setScrapeResults(data);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      setUrlError("Error fetching data. Please try again.");
    }
};

  const handleCrawl = async () => {
    if (!validateUrl(crawlUrl)) return;

    setIsLoading(true);
    setCrawlResults(null);

    try {
      const response = await fetch("https://scrapester.bugster.app/v1/crawl", {
        method: "POST",
        headers: {
          Authorization: "Bearer platanus-hack",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: crawlUrl,
          options: {
            max_pages: Number(crawlerOptions.max_pages),
            max_depth: Number(crawlerOptions.max_depth),
            timeout: Number(crawlerOptions.timeout),
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Crawl response:", data);

      setIsLoading(false);
      setCrawlResults(data)
    } catch (error) {
      console.error("Error:", error);
      console.log(error);

      setIsLoading(false);
      setUrlError("Error fetching data. Please try again.");
    }
  };

  const handleUrlChange = (e, type) => {
    const value = e.target.value;
    if (type === "scrape") {
      setScrapeUrl(value);
    } else {
      setCrawlUrl(value);
    }
    setUrlError("");
  };

  return (
    <ToastProvider>
      <div className="mx-20 px-4 py-8 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Playground</h1>
          <p className="text-sm text-muted-foreground">
            Try out Scapester in this visual playground
          </p>
        </div>

        <Tabs
          defaultValue="scrape"
          className="w-full"
          onValueChange={handleTabChange}
        >
          <TabsList className="w-full justify-start border-b bg-transparent p-0 mb-6">
            <TabsTrigger
              value="scrape"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Single URL
              <span className="ml-2 text-xs text-muted-foreground">/scrape</span>
            </TabsTrigger>
            <TabsTrigger
              value="crawl"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Crawl
              <span className="ml-2 text-xs text-muted-foreground">/crawl</span>
            </TabsTrigger>
          </TabsList>

          {isLoading ? (
            <div className="fixed inset-0 flex items-center justify-center bg-background/80">
              <LoadingState />
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <TabsContent value="scrape" className="space-y-4 mt-0">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="scrapeUrl"
                            className="text-sm font-medium"
                          >
                            URL
                          </label>
                          <div className="flex gap-4">
                            <div className="flex-1 space-y-1">
                              <Input
                                id="scrapeUrl"
                                type="url"
                                placeholder="https://example.com"
                                className={`font-mono ${
                                  urlError ? "border-red-500" : ""
                                }`}
                                value={scrapeUrl}
                                onChange={(e) => handleUrlChange(e, "scrape")}
                              />
                              {urlError && (
                                <p className="text-sm text-red-500">{urlError}</p>
                              )}
                            </div>
                            <Button
                              onClick={handleScrape}
                              disabled={!scrapeUrl}
                              variant="outline"
                              className="gap-2 text-sm hover:bg-[#574a90] dark:hover:bg-[#574a90] hover:text-white transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:hover:bg-gray-200 dark:disabled:hover:bg-gray-700 disabled:cursor-not-allowed"
                            >
                              Run
                            </Button>
                          </div>
                        </div>

                        <Collapsible
                          open={isOptionsOpen}
                          onOpenChange={setIsOptionsOpen}
                          className="space-y-2"
                        >
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              className="flex items-center gap-2 p-0 h-auto"
                            >
                              {isOptionsOpen ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                              <span className="text-sm">Options</span>
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="space-y-4">
                            <PlaygroundOptions type="scrape" />
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    </TabsContent>

                    <TabsContent value="crawl" className="space-y-4 mt-0">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="crawlUrl"
                            className="text-sm font-medium"
                          >
                            Start URL
                          </label>
                          <div className="flex gap-4">
                            <div className="flex-1 space-y-1">
                              <Input
                                id="crawlUrl"
                                type="url"
                                placeholder="https://example.com"
                                className={`font-mono ${
                                  urlError ? "border-red-500" : ""
                                }`}
                                value={crawlUrl}
                                onChange={(e) => handleUrlChange(e, "crawl")}
                              />
                              {urlError && (
                                <p className="text-sm text-red-500">{urlError}</p>
                              )}
                            </div>
                            <Button
                              onClick={handleCrawl}
                              disabled={!crawlUrl}
                              variant="outline"
                              className="gap-2 text-sm hover:bg-[#574a90] dark:hover:bg-[#574a90] hover:text-white transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:hover:bg-gray-200 dark:disabled:hover:bg-gray-700 disabled:cursor-not-allowed"
                            >
                              Run
                            </Button>
                          </div>
                        </div>

                        <Collapsible
                          open={isOptionsOpen}
                          onOpenChange={setIsOptionsOpen}
                          className="space-y-2"
                        >
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              className="flex items-center gap-2 p-0 h-auto"
                            >
                              {isOptionsOpen ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                              <span className="text-sm">Options</span>
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="space-y-4">
                            <div className="space-y-4">
                              <h3 className="font-semibold">Crawler Options</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="max_pages">Page Limit</Label>
                                  <Input
                                    id="max_pages"
                                    type="number"
                                    placeholder="4"
                                    className="font-mono"
                                    value={crawlerOptions.max_pages}
                                    onChange={(e) => handleCrawlerOptionChange('max_pages', e.target.value)}
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="max_depth">Max Depth</Label>
                                  <Input
                                    id="max_depth"
                                    type="number"
                                    placeholder="2"
                                    className="font-mono"
                                    value={crawlerOptions.max_depth}
                                    onChange={(e) => handleCrawlerOptionChange('max_depth', e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="space-y-6">
                                <h3 className="font-semibold">Page Options</h3>

                                <div className="space-y-3">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox 
                                      id="extract_main"
                                      checked={crawlerOptions.extract_main}
                                      onCheckedChange={(checked) => 
                                        handleCrawlerOptionChange('extract_main', checked)
                                      }
                                    />
                                    <Label htmlFor="extract_main">
                                      Extract only main content
                                    </Label>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    <Checkbox 
                                      id="include_links"
                                      checked={crawlerOptions.include_links}
                                      onCheckedChange={(checked) => 
                                        handleCrawlerOptionChange('include_links', checked)
                                      }
                                    />
                                    <Label htmlFor="include_links">
                                      Include page links
                                    </Label>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="timeout">
                                    Timeout (in ms)
                                  </Label>
                                  <Input
                                    id="timeout"
                                    type="number"
                                    placeholder="30000"
                                    className="font-mono"
                                    value={crawlerOptions.timeout}
                                    onChange={(e) => handleCrawlerOptionChange('timeout', e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    </TabsContent>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {activeTab === "scrape" && scrapeResults && (<ScrapeResults data={scrapeResults} />
                )}
                {activeTab === "crawl" && crawlResults && (
                  <CrawlResults 
                    data={crawlResults} 
                    onRetry={handleCrawl} 
                  />
                )}
                {!scrapeResults && !crawlResults && <EmptyState />}
              </div>
            </div>
          )}
        </Tabs>
      </div>
    </ToastProvider>
  );
}