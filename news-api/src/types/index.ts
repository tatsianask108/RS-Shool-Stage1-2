//general Response
export interface IResponse {
    status: 'ok' | 'error';
    sources: ISource[];
}

export interface ISource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

//news Response
export interface INewsResponse {
    status: 'ok' | 'error';
    totalResults: number;
    articles: INewsArticle[];
}

export interface INewsArticle {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export enum HTTPMethods {
    GET = 'GET',
    POST = 'POST',
    OPTIONS = 'OPTIONS',
    PUT = 'PUT',
}

export type optionsObj = {
    [key: string]: string;
};
export type responseObj = {
    endpoint: string;
    options?: {
        [key: string]: string;
    };
};

export interface Response {
    body: ReadableStream;
    bodyUsed: false;
    headers: Headers;
    ok: boolean;
    status: number;
    statusText: string;
}

export type CallBack = (data: IResponse | INewsResponse) => void;