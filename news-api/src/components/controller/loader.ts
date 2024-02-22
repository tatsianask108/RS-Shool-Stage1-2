import { HTTPMethods, optionsObj, responseObj, IResponse, INewsResponse, CallBack } from '../../types/index';
class Loader {
    constructor(
        protected baseLink: string,
        protected options: optionsObj
    ) {
        // this.baseLink = baseLink;
        // this.options = options;
    }

    protected getResp(
        { endpoint, options = {} }: responseObj,
        callback = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load(HTTPMethods.GET, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: optionsObj, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(
        method: HTTPMethods,
        endpoint: string,
        callback: CallBack<IResponse | INewsResponse>,
        options = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res) => this.errorHandler(res))
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
