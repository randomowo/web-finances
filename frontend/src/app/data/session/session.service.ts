import {Injectable} from '@angular/core';
import {HTTPRequest} from '../../shared/backend/request';
import {Session} from './session.model';
import {SessionStorage} from './session.storage';
import {addCookie, removeCookie} from '../../shared';

@Injectable()
export class SessionService {
    constructor(
        private readonly storage: SessionStorage,
    ) {}

    private readonly request: HTTPRequest<Session> = new HTTPRequest<Session>('user');


    async connect() {
        if (!(await this.valid()) && this.storage.getValue().updateToken) {
            await this.updateToken()
        }
    }

    private processData(data: Session) {
        data.expires = new Date(data.expires as string);
        this.storage.update(data);

        addCookie('FIN_TOKEN', data.token, {expires: data.expires});
        window.localStorage.setItem('updateToken', data.updateToken);
    }

    async valid() {
        const session = this.storage.getValue();
        return (new Date()).getTime() < ((session.expires as Date).getTime() || 0);
    }

    async updateToken(): Promise<void> {
        const response = await this.request.put({
            updateToken: this.storage.getValue().updateToken
        });

        this.processData(await response.json());
    }

    async register(email: string, username: string, password: string): Promise<void> {
        const response = await this.request.post({
            email,
            username,
            password
        }, {}, {id: 'new'});

        this.processData(await response.json());
    }

    async login(username: string, password: string): Promise<void> {
        const response = await this.request.post({}, {
            'Authorization': btoa(`${username}:${password}`),
        });

        this.processData(await response.json());
    }

    async logout(): Promise<void> {
        this.storage.reset();
        removeCookie('FIN_TOKEN');
        window.localStorage.removeItem('updateToken');
    }
}