import { IDto, IUserLoginDto, IUserLoginResultDto } from '@app/interfaces/interfaces';
import WsService from '@services/websocket';

export interface AuthResult {
    authorized: boolean;
    message?: string;
}

export default class AuthService {
    protected storage = sessionStorage;

    protected wss: WsService;

    protected isAuthorized: boolean = false;

    constructor(wss: WsService) {
        this.wss = wss;
    }

    public isAuth() {
        return this.isAuthorized;
    }

    public async auth(data: IUserLoginDto): Promise<AuthResult> {
        const response = await this.wss.message<IDto, IUserLoginResultDto>('USER_LOGIN', data);
        const result = {
            authorized: false,
            message: '',
        } as AuthResult;

        if (response.user && response.user.isLogined) {
            this.isAuthorized = true;
            this.storage.setItem('user', JSON.stringify(data));
        } else if (response.error) {
            result.message = response.error;
        }
        result.authorized = this.isAuthorized;
        return result;
    }

    public async logout() {
        this.storage.clear();
        this.isAuthorized = false;
    }

    public async loginStorage() {
        const userData = this.storage.getItem('user');
        if (userData) {
            const userObject = JSON.parse(userData) as IUserLoginDto;
            const response = await this.wss.message<IDto, IUserLoginResultDto>('USER_LOGIN', userObject);

            if (response.user && response.user.isLogined) {
                this.isAuthorized = true;
            }
        }
        return this.isAuthorized;
    }
}
