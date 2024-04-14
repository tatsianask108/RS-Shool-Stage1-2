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

    public authService: AuthService;

    public wss: WsService;

    constructor(private root: HTMLElement) {
        this.wss = new WsService();
        this.authService = new AuthService(this.wss);
    }

    public static getInstance() {
        if (!App.instance) {
            App.instance = new App(document.body);
        }
        return App.instance;
    }

    public render(page: Page) {
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
            app.render(new NotFoundPage());
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
            app.render(new LoginPage());
        },
    ],
    [
        '/about',
        () => {
            app.render(new AboutPage());
        },
    ],
    [
        '/main',
        () => {
            if (!app.authService.isAuth()) {
                window.location.href = '#/login';
            }
            app.render(new MainPage());
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
    app.wss.on('open', async () => {
        await app.authService.loginStorage();
        router();
    });
    app.wss.on('close', async () => {
        // TBD
    });
});
