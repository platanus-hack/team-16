export interface CrawlerResponseData {
    url: string;
    markdown: string;
    metadata: Record<string, any>;
    timestamp: string;
}

export class CrawlerResponse implements CrawlerResponseData {
    url: string;
    markdown: string;
    metadata: Record<string, any>;
    timestamp: string;

    constructor(data: Partial<CrawlerResponseData>) {
        this.url = data.url || '';
        this.markdown = data.markdown || '';
        this.metadata = data.metadata || {};
        this.timestamp = data.timestamp || new Date().toISOString();
    }

    static fromDict(data: Record<string, any>): CrawlerResponse {
        return new CrawlerResponse({
            url: data.url,
            markdown: data.markdown,
            metadata: data.metadata,
            timestamp: data.timestamp,
        });
    }
}

export class CrawlerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CrawlerError';
    }
}

export class APIError extends CrawlerError {
    constructor(
        message: string,
        public statusCode?: number,
        public response?: Record<string, any>
    ) {
        super(message);
        this.name = 'APIError';
    }
}