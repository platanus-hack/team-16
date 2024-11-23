from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .core.crawler import AdvancedCrawler
from .api.routes import crawl, health
from .config import Settings

app = FastAPI(
    title="WebCrawler API",
    description="High-performance web crawler with caching and advanced features",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, tags=["health"])
app.include_router(crawl.router, prefix="/v1", tags=["crawler"])
