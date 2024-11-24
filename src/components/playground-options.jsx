'use client'

import { CommonOptions } from "./common-options"
import { CrawlerOptions } from "./crawler-options"

export function PlaygroundOptions({ type }) {
  return (
    <div className="space-y-4">
      {type === 'crawl' && <CrawlerOptions />}
      <CommonOptions />
    </div>
  )
}