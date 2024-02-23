import AppLoader from './appLoader';
import { IResponse, INewsResponse, CallBack } from '../../types/index';
import { isHTMLElement } from '../../helpers/helpers';

class AppController extends AppLoader {
    public getSources(callback: CallBack<IResponse | INewsResponse>): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: Event, callback: CallBack<INewsResponse | IResponse>): void {
        if (!(isHTMLElement(e.currentTarget) && isHTMLElement(e.target))) {
            return;
        }

        let target = e.target;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target?.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }

            if (isHTMLElement(target.parentNode)) {
                target = target?.parentNode;
            }
        }
    }
}

export default AppController;
