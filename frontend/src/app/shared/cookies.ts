
export function getCookie(key: string): Record<string, any> {
    const cookie: Record<string, any> = {
        value: null,
        expires: 0,
    };
    if (!document.cookie) {
        return cookie;
    }
    const cookies = `; ${document.cookie}`;
    const parts = cookies.split(`; ${key}=`);
    if (parts.length !== 2) {
        return cookie;
    }
    const cookieArr = parts.pop()!.split(';');
    cookie['value'] = cookieArr.pop();

    cookieArr.forEach((item) => {
        const [k, v] = item.split('=');
        if (k === 'value') {
            // console.log('cookie error');
            return;
        }
        cookie[k] = v;
    })
    return cookie;
}

export function addCookie(key: string, value: any, params: Record<string, any>): void {
    removeCookie(key);
    let cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    if (params) {
        Object.entries(params).forEach(([k, v]) => {
            cookie += `;${encodeURIComponent(k)}=${encodeURIComponent(v)}`
        })
    }
    document.cookie = document.cookie ? document.cookie + `; ${cookie}` : cookie;
}

export function removeCookie(key: string): void {
    if (!document.cookie) {
        return;
    }
    const newCookies: string[] = [];
    document.cookie.split('; ').forEach((cookie) => {
        if (!cookie.match(`/^${key}=/`)) {
            newCookies.push(cookie);
        }
    });

    document.cookie = newCookies.join('; ');
}