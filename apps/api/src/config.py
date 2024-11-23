from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    REDIS_URL: str = "redis://localhost:6379"
    CACHE_TTL: int = 3600
    MAX_CONCURRENT_CRAWLS: int = 5
    RATE_LIMIT_REQUESTS: int = 100
    RATE_LIMIT_PERIOD: int = 60
    API_KEY_HEADER: str = "X-API-Key"
    
    class Config:
        env_file = ".env"

settings = Settings()
