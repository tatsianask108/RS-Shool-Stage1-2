import { IParticipant } from '../interfaces/interfaces';
import { EventEmitter } from '../utils/event-emitter';

export enum ParticipantEvents {
    LOGIN = 'login',
    LOGOUT = 'logout',
}
export default class Participant extends EventEmitter implements IParticipant {
    login: string;

    isLogined: string;

    constructor(data: IParticipant) {
        super();
        this.login = data.login;
        this.isLogined = data.isLogined;
    }
}
