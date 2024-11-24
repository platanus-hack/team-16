'use client'
import { useEffect, useState } from "react"
import logo from "../lib/LOGO.png";

export function LoadingState() {
  const [scale, setScale] = useState(1)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setScale(prev => prev === 1 ? 1.1 : 1)
    }, 600)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      <div 
        className="transition-transform duration-600 ease-in-out"
        style={{ transform: `scale(${scale})` }}
      >
        <img
          src={logo}
          alt="Scapester Logo"
          width={160}
          height={160}
          className="rounded-xl"
        />
      </div>
      <p className="text-3xl font-medium">
        <span className="font-bold text-[#574a90]">Scrapester</span> is cooking
      </p>
    </div>
  )
}