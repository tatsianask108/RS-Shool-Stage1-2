import { IDto, IRequest, RequestTypes } from '@app/interfaces/interfaces';
import { EventEmitter } from '@app/utils/event-emitter';

export default class WsService extends EventEmitter {
    protected options = {
        server: 'ws://localhost:4000',
        timeout: 30,
    };

    private socket: WebSocket;

    constructor() {
        super();
        this.socket = new WebSocket(this.options.server);
        this.addListeners();
    }

    protected addListeners() {
        this.socket.addEventListener('open', () => {
            this.emit('open');
        });
        this.socket.addEventListener('close', () => {
            this.emit('close');
            this.socket = new WebSocket(this.options.server);
            this.addListeners();
        });
        this.socket.addEventListener('error', () => {
            this.emit('error');
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
            }, this.options.timeout * 1000);

            this.socket.addEventListener('message', onMessage);
            this.socket.send(JSON.stringify(request));
        });
    }
}
