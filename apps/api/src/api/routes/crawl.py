from fastapi import APIRouter, HTTPException, BackgroundTasks, Depends
from ..models.schemas import ScrapeRequest, CrawlRequest
from core.crawler import ScrapesterCrawler
from typing import Dict, List
import asyncio

router = APIRouter()
crawler = None


async def get_crawler():
    global crawler
    if crawler is None:
        crawler = ScrapesterCrawler()
        await crawler.initialize()
    return crawler


@router.post("/scrape")
async def scrape_url(
    request: ScrapeRequest, crawler: ScrapesterCrawler = Depends(get_crawler)
) -> Dict:
    """
    Scrape a single URL with advanced options
    """
    try:
        result = await crawler.scrape_url(str(request.url), None)
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/crawl")
async def crawl_website(
    request: CrawlRequest,
    background_tasks: BackgroundTasks,
    crawler: ScrapesterCrawler = Depends(get_crawler),
) -> Dict:
    """
    Crawl an entire website with advanced options
    """
    try:
        # Start crawling in the background
        results = await crawler.crawl_website(
            str(request.url), request.options.dict() if request.options else None
        )
        return {
            "success": True,
            "data": results,
            "stats": {
                "pages_crawled": len(results),
                "successful_crawls": sum(1 for r in results if r.get("success", False)),
            },
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
