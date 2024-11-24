from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, RedirectResponse
from api.routes import crawl
from config import settings
import logging
from contextlib import asynccontextmanager

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    # Cleanup on shutdown
    crawler = await crawl.get_crawler()
    await crawler.close()


app = FastAPI(
    title="Scrapester API",
    description="High-performance web crawler",
    version="1.0.0",
    lifespan=lifespan,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Error handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global error handler caught: {exc}")
    return JSONResponse(status_code=500, content={"detail": str(exc)})


# Include routers
app.include_router(crawl.router, prefix="/v1", tags=["crawler"])


@app.get("/docs", tags=["API Documentation"])
async def docs_redirect():
    return RedirectResponse(url="/api/v1/docs")


@app.get("/health", tags=["Healthcheck"])
async def health_check():
    return {"status": "ok"}


@app.get("/openapi.json", include_in_schema=False)
async def get_openapi_json():
    return app.openapi()
