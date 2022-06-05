export class HTTPResponse<T> {
    constructor(private response: Response) {
        if (!this.response.ok) {
            return;
        }

        if (this.response.status >= 500) {
            alert();
            return;
        }

        switch (this.response.status) {
            case 400:
                return;

            case 401:
                throw new Error('unauth');

            case 403:
                throw new Error('forbiden');

            default:
                throw new Error(this.response.statusText);
        }
    }


    async json(): Promise<T> {
        let json;

        try {
            json = await this.response.json();
        } catch (e) {
            alert(e);
            throw new Error();
        }

        return json as T;
    }

    async text(): Promise<string> {
        let text;

        try {
            text = await this.response.text();
        } catch (e) {
            alert(e);
            throw new Error();
        }

        return text;
    }
}