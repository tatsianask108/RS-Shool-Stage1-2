import { IDto, IRequest, RequestTypes } from '@app/interfaces/interfaces';
import { EventEmitter } from '@app/utils/event-emitter';

const TIMEOUT = 30000;

export enum SocketEvents {
    OPEN = 'open',
    CLOSE = 'close',
    ERROR = 'error',
}

export default class WsService extends EventEmitter {
    protected options = {
        server: 'ws://localhost:4000',
        timeout: TIMEOUT,
    };

    private socket: WebSocket;

    constructor() {
        super();
        this.socket = new WebSocket(this.options.server);
        this.addListeners();
    }

    protected addListeners() {
        this.socket.addEventListener('open', () => {
            this.emit(SocketEvents.OPEN);
        });
        this.socket.addEventListener('close', () => {
            this.emit(SocketEvents.CLOSE);
            this.socket = new WebSocket(this.options.server);
            this.addListeners();
        });
        this.socket.addEventListener('error', () => {
            this.emit(SocketEvents.ERROR);
        });
    }

    public message<T, R extends IDto = IDto>(type: RequestTypes, payload: T): Promise<R> {
        return new Promise((resolve, reject) => {
            const requestId = Date.now();
            const request = {
                id: requestId.toString(),
                type,
                payload,
            } as IRequest<T>;

            const onMessage = (e: MessageEvent) => {
                const { data } = e;

                if (!data) {
                    return;
                }

                const dataObject = JSON.parse(data);
                if (parseInt(dataObject.id, 10) === requestId) {
                    this.socket.removeEventListener('message', onMessage);
                    resolve(dataObject.payload);
                }
            };

            setTimeout(() => {
                reject(new Error('Timeout'));
                this.socket.removeEventListener('message', onMessage);
            }, this.options.timeout);

            this.socket.addEventListener('message', onMessage);
            this.socket.send(JSON.stringify(request));
        });
    }

    public getWebsocket() {
        return this.socket;
    }
}
