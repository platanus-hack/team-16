import React from "react";
import { Label } from "../components/ui/label"
import { Input } from '../components/ui/input'

export function CrawlerOptions() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Crawler Options</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="limit">Limit</Label>
          <Input
            id="limit"
            type="number"
            placeholder="10"
            className="font-mono"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="max-depth">Max Depth</Label>
          <Input
            id="max-depth"
            type="number"
            placeholder="2"
            className="font-mono"
          />
        </div>
      </div>
    </div>
  )
}