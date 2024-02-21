import './news.css';
import { INewsArticle } from '../../../types/index';

class News {
    draw(data: INewsArticle[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
        news.forEach((item: INewsArticle, idx) => {
            if (newsItemTemp) {
                const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;
                const newsElement: Element | null = newsClone.querySelector('.news__item');
                if (idx % 2 && newsElement !== null) {
                    newsElement.classList.add('alt');
                }

                const urlToImg = newsClone.querySelector<HTMLElement>('.news__meta-photo');
                if (urlToImg instanceof HTMLElement) {
                    urlToImg.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                }
                newsClone.querySelector<HTMLElement>('.news__meta-author')!.textContent =
                    item.author || item.source.name;
                newsClone.querySelector<HTMLElement>('.news__meta-date')!.textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');

                newsClone.querySelector<HTMLElement>('.news__description-title')!.textContent = item.title;
                newsClone.querySelector<HTMLElement>('.news__description-source')!.textContent = item.source.name;
                newsClone.querySelector<HTMLElement>('.news__description-content')!.textContent = item.description;
                newsClone.querySelector<HTMLElement>('.news__read-more a')!.setAttribute('href', item.url);

                fragment.append(newsClone);
            }
        });

        document.querySelector<HTMLElement>('.news')!.innerHTML = '';
        document.querySelector<HTMLElement>('.news')!.appendChild(fragment);
    }
}

export default News;
