import News from './news/news';
import Sources from './sources/sources';
import { INewsResponse, IResponse } from '../../types/index';

export class AppView {
    private news; //?
    private sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: INewsResponse): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: IResponse): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
