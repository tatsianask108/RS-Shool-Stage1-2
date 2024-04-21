// import { IResponse } from '../interfaces/interfaces';
import WsService from './websocket';

export interface UsersRes {
    users: [];
}
export default class ChatService {
    protected wsService: WsService;

    constructor(wsService: WsService) {
        this.wsService = wsService;
        this.getActiveUsers();
    }

    public async getActiveUsers() {
        const data = {
            payload: null,
        };
        const response = (await this.wsService.message('USER_ACTIVE', data)) as { users: [{ login: string }] };
        console.log(response.users);
        return response.users;
    }

    public async getUnauthorizedUsers() {
        const data = {
            payload: null,
        };
        const response = (await this.wsService.message('USER_INACTIVE', data)) as { users: [{ login: string }] };
        console.log(response.users);
        return response.users;
    }
}
