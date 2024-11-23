from typing import Dict, Optional, List, Union
import requests
from dataclasses import dataclass
from datetime import datetime


@dataclass
class CrawlerResponse:
    url: str
    markdown: str
    metadata: Dict
    timestamp: str

    @classmethod
    def from_dict(cls, data: Dict) -> "CrawlerResponse":
        return cls(
            url=data.get("url", ""),
            markdown=data.get("markdown", ""),
            metadata=data.get("metadata", {}),
            timestamp=data.get("timestamp", datetime.utcnow().isoformat()),
        )


class CrawlerError(Exception):
    """Base exception for crawler errors"""

    pass


class APIError(CrawlerError):
    """Raised when the API returns an error"""

    def __init__(self, message: str, status_code: int = None, response: Dict = None):
        self.status_code = status_code
        self.response = response
        super().__init__(message)


class ScrapesterApp:
    def __init__(
        self, api_key: str, base_url: str = "http://localhost:8000", timeout: int = 600
    ):
        """Initialize the Crawler client

        Args:
            api_key: Your API key
            base_url: Base URL for the API (default: http://localhost:8000)
            timeout: Request timeout in seconds (default: 30)
        """
        self.api_key = api_key
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self.session = self._create_session()

    def _create_session(self) -> requests.Session:
        """Create a requests session with default headers"""
        session = requests.Session()
        session.headers.update(
            {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
                "User-Agent": "Scrapester-Python-SDK/1.0",
            }
        )
        return session

    def _request(
        self, method: str, endpoint: str, params: Dict = None, data: Dict = None
    ) -> Dict:
        """Make an HTTP request to the API"""
        url = f"{self.base_url}{endpoint}"

        try:
            response = self.session.request(
                method=method, url=url, params=params, json=data, timeout=self.timeout
            )

            if response.status_code == 429:
                raise APIError("Rate limit exceeded", status_code=429)

            response.raise_for_status()
            return response.json()

        except requests.exceptions.RequestException as e:
            if hasattr(e, "response") and e.response is not None:
                try:
                    error_data = e.response.json()
                except ValueError:
                    error_data = {"detail": e.response.text}
                raise APIError(
                    str(error_data.get("detail", "Unknown error")),
                    status_code=e.response.status_code,
                    response=error_data,
                )
            raise APIError(str(e))

    def scrape(self, url: str) -> CrawlerResponse:
        """Scrape a single URL

        Args:
            url: The URL to scrape
            options: Optional scraping configurations
                - wait_for_selector: CSS selector to wait for
                - screenshot: Take a screenshot (bool)
                - scroll: Enable smart scrolling (bool)
                - timeout: Custom timeout for this request

        Returns:
            CrawlerResponse object containing the scraped data
        """
        data = {"url": url}

        response = self._request("POST", "/v1/scrape", data=data)
        return CrawlerResponse.from_dict(response.get("data", {}))

    def crawl(self, url: str, options: Optional[Dict] = None) -> List[CrawlerResponse]:
        """Crawl a website starting from a URL

        Args:
            url: The starting URL to crawl
            options: Optional crawling configurations
                - max_pages: Maximum number of pages to crawl
                - max_depth: Maximum crawling depth
                - include_patterns: List of URL patterns to include
                - exclude_patterns: List of URL patterns to exclude

        Returns:
            List of CrawlerResponse objects
        """
        data = {"url": url, **(options or {})}

        response = self._request("POST", "/v1/crawl", data=data)
        return [CrawlerResponse.from_dict(item) for item in response.get("data", [])]
