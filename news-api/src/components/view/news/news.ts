import './news.css';
import { INewsArticle } from '../../../types/index';
import { isDocumentFragment, isHTMLElement } from '../../../helpers/helpers';

class News {
    draw(data: INewsArticle[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
        if (!newsItemTemp) {
            return;
        }
        news.forEach((item: INewsArticle, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true);
            if (!isDocumentFragment(newsClone)) {
                return;
            }
            const newsItem = newsClone.querySelector('.news__item');
            const newsMetaPhoto = newsClone.querySelector('.news__meta-photo');
            const newsMetaAuthor = newsClone.querySelector('.news__meta-author');
            const newsMetaDate = newsClone.querySelector('.news__meta-date');
            const descriptionSource = newsClone.querySelector('.news__description-source');
            const descriptionContent = newsClone.querySelector('.news__description-content');
            const descriptionTitle = newsClone.querySelector('.news__description-title');
            const readMore = newsClone.querySelector('.news__read-more a');
            isHTMLElement(newsItem) && idx % 2 ? newsItem.classList.add('alt') : new Error('error');
            isHTMLElement(newsMetaPhoto)
                ? (newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`)
                : new Error('error');

            isHTMLElement(newsMetaAuthor)
                ? (newsMetaAuthor.textContent = item.author || item.source.name)
                : new Error('error');
            isHTMLElement(newsMetaDate)
                ? (newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-'))
                : new Error('error');
            isHTMLElement(descriptionTitle) ? (descriptionTitle.textContent = item.title) : new Error('error');
            isHTMLElement(descriptionSource) ? (descriptionSource.textContent = item.source.name) : new Error('error');
            isHTMLElement(descriptionContent)
                ? (descriptionContent.textContent = item.description)
                : new Error('error');
            isHTMLElement(readMore) ? readMore.setAttribute('href', item.url) : new Error('error');

            fragment.append(newsClone);
        });

        document.querySelector<HTMLElement>('.news')!.innerHTML = '';
        document.querySelector<HTMLElement>('.news')!.appendChild(fragment);
    }
}

export default News;
