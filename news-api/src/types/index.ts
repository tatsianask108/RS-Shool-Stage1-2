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
    articles: IArticles[];
}

export interface IArticles {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}
