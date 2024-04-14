export type RequestTypes = 'USER_LOGIN' | 'USER_LOGOUT';
export type ResponseTypes = 'USER_LOGIN';

export interface IDto {}

export interface IRequest<T extends IDto> {
    id: string;
    type: RequestTypes;
    payload: T;
}

export interface IResponse<T extends IDto> {
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
