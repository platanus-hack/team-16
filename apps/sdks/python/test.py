from scrapester.crawler import ScrapesterApp, APIError


client = ScrapesterApp(api_key="your-api-key")

# # Scrape a single URL
# try:
#     url = "https://platan.us/"
#     result = client.crawl(url)
#     print(f"Title: {result.metadata.get('title')}")
#     print(f"Content:\n{result.markdown}")
# except APIError as e:
#     print(f"Error: {e}")


try:
    url = "https://platan.us/"
    result = client.crawl(url)
    print(f"{result}")
except APIError as e:
    print(f"Error: {e}")
