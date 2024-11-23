import axios, { AxiosError, AxiosInstance } from 'axios';
import { APIError, CrawlerResponse } from './types';
export class ScrapesterApp {
  private session: AxiosInstance;

  constructor(
    private apiKey: string,
    private baseUrl: string = 'http://localhost:8000',
    private timeout: number = 600000 // 600 seconds in milliseconds
  ) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.session = this.createSession();
  }

  private createSession(): AxiosInstance {
    return axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeout,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Scrapester-Python-SDK/1.0'
      }
    });
  }

  private async request(
    method: string,
    endpoint: string,
    params?: Record<string, any>,
    data?: Record<string, any>
  ): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await this.session.request({
        method,
        url,
        params,
        data,
      });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 429) {
          throw new APIError('Rate limit exceeded', 429);
        }

        if (error.response) {
          try {
            const errorData = error.response.data;
            throw new APIError(
              String(errorData.detail || 'Unknown error'),
              error.response.status,
              errorData
            );
          } catch {
            throw new APIError(
              error.response.statusText,
              error.response.status,
              { detail: error.response.statusText }
            );
          }
        }
      }
      
      throw new APIError(String(error));
    }
  }

  async scrape(url: string): Promise<CrawlerResponse> {
    const data = { url };
    const response = await this.request('POST', '/v1/scrape', undefined, data);
    return CrawlerResponse.fromDict(response.data || {});
  }

  async crawl(
    url: string,
    options?: {
      maxPages?: number;
      maxDepth?: number;
      includePatterns?: string[];
      excludePatterns?: string[];
    }
  ): Promise<CrawlerResponse[]> {
    const data = { url, ...options };
    const response = await this.request('POST', '/v1/crawl', undefined, data);
    return (response.data || []).map((item: any) => CrawlerResponse.fromDict(item));
  }
}
