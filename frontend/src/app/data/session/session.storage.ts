import {Store, StoreConfig} from '@datorama/akita';
import {Session} from './session.model';
import {getCookie} from '../../shared';

@StoreConfig({name: 'session'})
export class SessionStorage extends Store<Session> {
    constructor() {
        const token = getCookie('FIN_TOKEN');
        super({
            token: token['value'],
            updateToken: window.localStorage.getItem('updateToken') || '',
            expires: new Date(token['expires']),
        });
    }
}
