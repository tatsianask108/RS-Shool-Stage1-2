import AboutPage from './pages/about/about-page';
import LoginPage from './pages/login/login-page';
import MainPage from './pages/main/main-page';
import NotFoundPage from './pages/not-found';
import Page from './pages/page';
import AuthService from './services/auth';
import WsService from './services/websocket';

export default class App {
    private static instance: App | null = null;

    protected page: Page | undefined;

    protected loader: HTMLDivElement;

    public authService: AuthService;

    public wsService: WsService;

    constructor(private root: HTMLElement) {
        const loader = document.createElement('div');
        loader.textContent = 'Connecting ...';

        this.loader = loader;
        this.root.append(this.loader);

        this.wsService = new WsService();
        this.authService = new AuthService(this.wsService);

        this.wsService.on('open', async () => {
            this.loader.style.display = 'none';
            await this.authService.loginStorage();
            if (this.page) {
                this.page.getNode().style.display = '';
            } else {
                window.location.href = '#/login';
            }
        });

        this.wsService.on('close', () => {
            this.loader.style.display = 'block';
            if (this.page) {
                this.page.getNode().style.display = 'none';
            }
        });
    }

    public static getInstance() {
        if (!App.instance) {
            App.instance = new App(document.body);
        }
        return App.instance;
    }

    public renderPage(page: Page) {
        if (this.page) {
            this.page.destroy();
        }
        this.page = page;
        this.root.append(page.getNode());
    }
}

const app = App.getInstance();

const ROUTES = new Map([
    [
        '/not-found',
        () => {
            window.location.href = '#/not-found';
            app.renderPage(new NotFoundPage());
        },
    ],
    [
        '/',
        () => {
            window.location.href = '#/login';
        },
    ],
    [
        '/login',
        () => {
            if (app.authService.isAuth()) {
                window.location.href = '#/main';
            }
            app.renderPage(new LoginPage());
        },
    ],
    [
        '/about',
        () => {
            app.renderPage(new AboutPage());
        },
    ],
    [
        '/main',
        () => {
            if (!app.authService.isAuth()) {
                window.location.href = '#/login';
            }
            app.renderPage(new MainPage());
            console.log('main');
        },
    ],
]);

const router = () => {
    const path = window.location.hash.slice(1).toLowerCase();
    const routerHandle = ROUTES.get(path || '/') || ROUTES.get('/not-found');
    if (routerHandle) {
        routerHandle();
    }
};

window.addEventListener('hashchange', router);
window.addEventListener('load', async () => {
    app.wsService.once('open', async () => {
        await app.authService.loginStorage();
        router();
    });
});
