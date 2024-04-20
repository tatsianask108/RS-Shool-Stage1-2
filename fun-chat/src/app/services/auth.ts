import { IDto, IUser, IUserLoginDto, IUserLoginResultDto, IUserLogoutDto } from '@app/interfaces/interfaces';
import WsService from '@services/websocket';

export interface AuthResult {
    authorized: boolean;
    message: string;
}

export default class AuthService {
    protected storage = sessionStorage;

    protected wsService: WsService;

    protected isAuthorized: boolean = false;

    constructor(wsService: WsService) {
        this.wsService = wsService;
    }

    public isAuth() {
        return this.isAuthorized;
    }

    public getUserData(): IUser | null {
        const user = this.storage.getItem('user');
        if (user) {
            return JSON.parse(user);
        }
        return null;
    }

    public setUserData(user: IUser) {
        this.storage.setItem('user', JSON.stringify(user));
    }

    public async auth(data: IUserLoginDto): Promise<AuthResult> {
        const response = await this.wsService.message<IDto, IUserLoginResultDto>('USER_LOGIN', data);
        const result = {
            authorized: false,
            message: '',
        } as AuthResult;

        if (response.user && response.user.isLogined) {
            this.isAuthorized = true;
            this.setUserData(data.user);
        } else if (response.error) {
            result.message = response.error;
        }
        result.authorized = this.isAuthorized;
        return result;
    }

    public async logout() {
        const user = this.getUserData();
        if (user) {
            await this.wsService.message<IUserLogoutDto>('USER_LOGOUT', { user });
            this.storage.clear();
            this.isAuthorized = false;
        }
    }

    public async loginStorage() {
        const user = this.getUserData();
        if (user) {
            const response = await this.wsService.message<IDto, IUserLoginResultDto>('USER_LOGIN', { user });

            if (response.user && response.user.isLogined) {
                this.isAuthorized = true;
            }
        }
        return this.isAuthorized;
    }
}
