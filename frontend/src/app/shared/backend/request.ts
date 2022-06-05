import {HTTPResponse} from './response';
import {RequestMethod} from './types';

// @ts-ignore
type RequestData = Record<string, string | number | string[] | number[] | RequestData | RequestData[]>;

type RequestExtras = Record<string, string | number>;

export class HTTPRequest<T> {
    constructor(
        private readonly path: string,
        private readonly apiVersion: number = 1
    ) {}

    get api() {
        return `/api/v${this.apiVersion}/${this.path}`;
    }

    private async request(method: RequestMethod, options: RequestInit, extras?: RequestExtras) {
        let response: Response;

        let api = this.api

        if (extras && 'id' in extras) {
            api = `${api}/${extras['id']}`;
        }

        try {
            response = await fetch(api, {
                method,
                headers: {
                    ...(options ? options.headers : {}),
                },
            });
        } catch (e) {
            alert(e);
            throw new Error();
        }

        return new HTTPResponse<T>(response);
    }

    async get(headers?: HeadersInit, extras?: RequestExtras): Promise<HTTPResponse<T>> {
        return await this.request('GET', {headers});
    }

    async post(data: RequestData, headers?: HeadersInit, extras?: RequestExtras): Promise<HTTPResponse<T>> {
        return await this.request('POST', {
            headers: {
                'Content-Type': 'application/json',
                ...(headers || {})
            },
            body: JSON.stringify(data)
        }, extras);
    }

    async put(data: RequestData, headers?: HeadersInit, extras?: RequestExtras): Promise<HTTPResponse<T>> {
        return await this.request('PUT', {
            headers: {
                'Content-Type': 'application/json',
                ...(headers || {})
            },
            body: JSON.stringify(data)
        }, extras);
    }

    async delete(id: string | number, headers?: HeadersInit, extras?: RequestExtras): Promise<HTTPResponse<T>> {
        return await this.request('DELETE', {headers}, {...extras, id});
    }
}