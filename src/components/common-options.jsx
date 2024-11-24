import React from "react";
import { Label } from "../components/ui/label";
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { useEffect, useState } from "react";
// Importa la imagen directamente
import logo from "../lib/LOGO.png";

export function CommonOptions() {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold">Page Options</h3>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="extract-main" />
          <Label htmlFor="extract-main">Extract only main content</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="include-links" />
          <Label htmlFor="include-links">Include page links</Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="wait-time">Wait for (in ms)</Label>
        <Input
          id="wait-time"
          type="number"
          placeholder="1000"
          className="font-mono"
        />
      </div>
    </div>
  )
}

export function EmptyState() {
  const [scale, setScale] = useState(1);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setScale(prev => prev === 1 ? 1.05 : 1);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8">
      <div
        className="transition-transform duration-1000 ease-in-out"
        style={{ transform: `scale(${scale})` }}
      >
        <img
          src={logo}
          alt="Scapester Logo"
          width={200}
          height={200}
          className="rounded-xl"
        />
      </div>
      <div className="text-center space-y-2">
        <p className="text-2xl font-medium text-muted-foreground">
          Ready to destructure
        </p>
        <p className="text-sm text-muted-foreground">
          Enter a URL above to start scraping or crawling
        </p>
      </div>
    </div>
  )
}