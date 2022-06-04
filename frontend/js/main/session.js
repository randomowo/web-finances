const initSession = async () => {
    const token = window.localStorage.getItem('token');
    const expires = window.localStorage.getItem('expires');
    if (token && (new Date()).getTime() < expires) {
        if (!window.localStorage.getItem('page')) {
            window.localStorage.setItem('page', 'fin');
        }
        setTokenUpdater(expires);
        return;
    }

    await logout();
    window.localStorage.setItem('page', 'login');
}

const login = async (username, password) => {
    const credentials = btoa(`${username}:${password}`);
    const response = await fetch('/api/v1/auth', {
        method: 'POST',
        headers: {
            'Authorization': credentials
        }
    });
    if (!response.ok) {
        alert();
        return;
    }
    window.localStorage.setItem('credentials', credentials);

    const data = await response.json();
    if (!data.token || !data.expires) {
        alert();
        return;
    }

    window.localStorage.setItem('token', data.token);

    setTokenUpdater(data.expires);
}

const logout = async () => {
    await fetch('/api/v1/logout', {
        method: 'POST',
        data: {
            'token': window.localStorage.getItem('token')
        }
    })
    window.localStorage.removeItem('token');
}

const register = async (username, email, password) => {

}

const setTokenUpdater = (expires) => {
    window.localStorage.setItem('tokenExpires', expires);
    const tokenUpdateId = window.localStorage.getItem('tokenUpdateId');
    if (tokenUpdateId) {
        clearTimeout(tokenUpdateId);
    }
    const timeout = expires - (new Date()).getTime();
    window.localStorage.setItem('tokenUpdateId', setTimeout(updateToken, timeout));
}

const updateToken = async () => {
    const credentials = window.localStorage.getItem('credentials');
    if (!credentials) {
        return;
    }

    const response = await fetch('/api/v1/auth', {
        method: 'PUT',
        headers: {
            'Authorization': credentials
        }
    });

    if (!response.ok) {
        window.localStorage.removeItem('token');
        alert();
        return;
    }
    const data = await response.json();

    if (!data.token || !data.expires) {
        alert();
        return;
    }

    window.localStorage.setItem('token', data.token);

    setTokenUpdater(data.expires);
}