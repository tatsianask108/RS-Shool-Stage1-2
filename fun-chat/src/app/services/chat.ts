import { IDto, IUserListDto, IParticipant, IResponse, IUserExternalDto } from '../interfaces/interfaces';
import Participant, { ParticipantEvents } from '../models/participant';
import WsService from './websocket';

export default class ChatService {
    protected wsService: WsService;

    protected users: Map<IParticipant['login'], Participant>;

    constructor(wsService: WsService) {
        this.wsService = wsService;

        this.users = new Map();
        this.initListeners();
    }

    protected async loadActiveUsers() {
        const data = {
            payload: null,
        };
        const response = await this.wsService.message<IDto, IUserListDto>('USER_ACTIVE', data);
        response.users.forEach((user) => {
            this.users.set(user.login, new Participant(user));
        });
    }

    protected async loadInactiveUsers() {
        const data = {
            payload: null,
        };
        const response = await this.wsService.message<IDto, IUserListDto>('USER_INACTIVE', data);
        response.users.forEach((user) => {
            this.users.set(user.login, new Participant(user));
        });
    }

    protected initListeners() {
        this.wsService.getWebsocket().addEventListener('message', (e: MessageEvent) => {
            const { data } = e;

            if (!data) {
                return;
            }

            const dataObject = JSON.parse(data) as IResponse<IUserExternalDto>;
            if (dataObject.type === 'USER_EXTERNAL_LOGIN') {
                this.users.get(dataObject.payload.user.login)?.emit(ParticipantEvents.LOGIN);
            } else if (dataObject.type === 'USER_EXTERNAL_LOGOUT') {
                this.users.get(dataObject.payload.user.login)?.emit(ParticipantEvents.LOGOUT);
            }
        });
    }

    public async getParticipants() {
        await this.loadActiveUsers();
        await this.loadInactiveUsers();

        return Array.from(this.users.values());
    }
}
