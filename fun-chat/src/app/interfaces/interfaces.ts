export type RequestTypes = 'USER_LOGIN' | 'USER_LOGOUT' | 'USER_ACTIVE' | 'USER_INACTIVE';
export type ResponseTypes = 'USER_LOGIN';

export interface IDto {}

export interface IRequest<T> {
    id: string;
    type: RequestTypes;
    payload: T;
}

export interface IResponse<T> {
    id: string;
    type: ResponseTypes;
    payload: T;
}

export interface IUser {
    login: string;
    password: string;
}

export interface IUserLoginDto {
    user: IUser;
}

export interface IUserLogoutDto extends IUserLoginDto {}

export interface IUserLoginResultDto {
    error?: string;
    user?: {
        login: string;
        isLogined: string;
    };
}
