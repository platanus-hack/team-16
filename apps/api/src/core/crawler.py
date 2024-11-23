from playwright.async_api import async_playwright, Page
import asyncio
from typing import Dict, List, Optional, Union
import json
from datetime import datetime
import hashlib
from bs4 import BeautifulSoup
import markdown
import logging
from ..config import settings

logger = logging.getLogger(__name__)


class ScrapesterCrawler:
    def __init__(self):
        self.browser = None
        self.context = None

    async def initialize(self):
        """Initialize the browser instance"""
        self.playwright = await async_playwright().start()
        self.browser = await self.playwright.chromium.launch(
            headless=False, args=["--no-sandbox", "--disable-setuid-sandbox"]
        )
        self.context = await self.browser.new_context(
            viewport={"width": 1920, "height": 1080},
            user_agent="Chrome/69.0.3497.100 Safari/537.36",
        )

    async def close(self):
        """Clean up resources"""
        if self.context:
            await self.context.close()
        if self.browser:
            await self.browser.close()
        if hasattr(self, "playwright"):
            await self.playwright.stop()

    async def _smart_scroll(self, page: Page):
        """Smart scroll to handle dynamic loading"""
        try:
            last_height = await page.evaluate("document.body.scrollHeight")
            while True:
                await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                await page.wait_for_timeout(1000)
                new_height = await page.evaluate("document.body.scrollHeight")
                if new_height == last_height:
                    break
                last_height = new_height
        except Exception as e:
            logger.warning(f"Smart scroll encountered an error: {e}")

    async def _extract_links(self, page: Page, base_url: str) -> List[str]:
        """Extract all valid links from the page"""
        links = await page.evaluate(
            """() => {
            const links = Array.from(document.links)
                .map(link => link.href)
                .filter(href => href.startsWith('http'));
            return [...new Set(links)];
        }"""
        )
        return [link for link in links if link.startswith(base_url)]

    async def _extract_content(self, page: Page) -> Dict:
        """Extract various content formats from the page"""
        html = await page.content()

        # Use BeautifulSoup for better content extraction
        soup = BeautifulSoup(html, "html.parser")

        # Remove unwanted elements
        for element in soup.select("script, style, noscript, iframe, img"):
            element.decompose()

        # Initialize markdown content
        md_parts = []

        # Extract and format headers
        for h in soup.find_all(["h1", "h2", "h3", "h4", "h5", "h6"]):
            level = int(h.name[1])  # get header level
            md_parts.append(f"{'#' * level} {h.get_text(strip=True)}\n")

        # Extract and format paragraphs
        for p in soup.find_all("p"):
            text = p.get_text(strip=True)
            if text:
                # Check if it's a link paragraph
                links = p.find_all("a")
                if links:
                    for link in links:
                        href = link.get("href", "")
                        text = link.get_text(strip=True)
                        if href and text:
                            md_parts.append(f"[**{text}**]({href})\n")
                else:
                    md_parts.append(f"{text}\n")
        # Join all parts with proper spacing
        markdown_content = "\n".join(md_parts)
        # Get clean text
        text = soup.get_text(separator="\n", strip=True)

        # Convert to markdown
        # md = markdown.markdown(text)

        # Extract metadata
        metadata = await page.evaluate(
            """() => {
            const metadata = {};
            
            // Basic metadata
            metadata.title = document.title;
            
            // Meta tags
            const metaTags = document.getElementsByTagName('meta');
            for (let tag of metaTags) {
                const name = tag.getAttribute('name') || tag.getAttribute('property');
                const content = tag.getAttribute('content');
                if (name && content) {
                    metadata[name] = content;
                }
            }
            
            // OpenGraph
            metadata.og = {};
            document.querySelectorAll('meta[property^="og:"]').forEach(tag => {
                const property = tag.getAttribute('property').substring(3);
                metadata.og[property] = tag.getAttribute('content');
            });
            
            return metadata;
        }"""
        )
        metadata = {
            "title": metadata.get("title", ""),
            "description": metadata.get("description", ""),
            "robots": metadata.get("robots", ""),
        }
        return {
            "url": page.url,
            "markdown": markdown_content,
            "metadata": metadata,
            "timestamp": datetime.utcnow().isoformat(),
        }

    async def scrape_url(self, url: str, options: Dict = None) -> Dict:
        """Scrape a single URL with advanced options"""
        if not self.context:
            await self.initialize()

        options = options or {}
        page = await self.context.new_page()

        try:
            # Configure page
            if options.get("timeout"):
                page.set_default_timeout(options["timeout"])

            # Handle authentication if needed
            if options.get("auth"):
                await self.handle_authentication(page, options["auth"])

            # Navigate to page
            response = await page.goto(url, wait_until="networkidle")
            if not response.ok:
                raise Exception(f"Failed to load page: {response.status}")

            # Handle dynamic content
            if options.get("wait_for_selector"):
                await page.wait_for_selector(options["wait_for_selector"])

            if options.get("scroll", True):
                await self._smart_scroll(page)

            # Execute custom actions
            if options.get("actions"):
                await self.execute_actions(page, options["actions"])

            # Take screenshot if requested
            screenshot = None
            if options.get("screenshot"):
                screenshot = await page.screenshot(
                    full_page=True, type="jpeg", quality=80
                )

            # Extract content
            content = await self._extract_content(page)

            if screenshot:
                content["screenshot"] = screenshot

            return content

        except Exception as e:
            logger.error(f"Error scraping {url}: {e}")
            raise
        finally:
            await page.close()

    async def execute_actions(self, page: Page, actions: List[Dict]):
        """Execute custom actions on the page"""
        for action in actions:
            action_type = action.get("type")
            try:
                if action_type == "click":
                    await page.click(action["selector"])
                elif action_type == "type":
                    await page.type(action["selector"], action["text"])
                elif action_type == "wait":
                    await page.wait_for_timeout(action["duration"])
                elif action_type == "scroll":
                    await self._smart_scroll(page)
                # Add more action types as needed
            except Exception as e:
                logger.error(f"Error executing action {action_type}: {e}")
                raise

    async def handle_authentication(self, page: Page, auth_config: Dict):
        """Handle different authentication methods"""
        auth_type = auth_config.get("type")

        if auth_type == "basic":
            await self.context.setHTTPCredentials(
                {
                    "username": auth_config["username"],
                    "password": auth_config["password"],
                }
            )
        elif auth_type == "form":
            await page.goto(auth_config["login_url"])
            await page.type(auth_config["username_selector"], auth_config["username"])
            await page.type(auth_config["password_selector"], auth_config["password"])
            await page.click(auth_config["submit_selector"])
            await page.wait_for_load_state("networkidle")

    async def crawl_website(self, start_url: str, options: Dict = None) -> List[Dict]:
        """Crawl an entire website with advanced options"""
        if not self.context:
            await self.initialize()

        options = options or {}
        max_pages = options.get("max_pages", 10)
        max_depth = options.get("max_depth", 3)

        visited = set()
        to_visit = {(start_url, 0)}  # (url, depth)
        results = []

        while to_visit and len(visited) < max_pages:
            url, depth = to_visit.pop()
            if url in visited or depth > max_depth:
                continue

            try:
                result = await self.scrape_url(url, options)
                results.append(result)
                visited.add(url)

                if depth < max_depth:
                    page = await self.context.new_page()
                    await page.goto(url)
                    new_urls = await self._extract_links(page, start_url)
                    await page.close()

                    for new_url in new_urls:
                        if new_url not in visited:
                            to_visit.add((new_url, depth + 1))

            except Exception as e:
                logger.error(f"Error crawling {url}: {e}")

        return results
