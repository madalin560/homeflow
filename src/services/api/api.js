import Cookie from 'services/cookies/Cookie';

const GET = 'get', POST = 'post', DELETE = 'delete';

const HEADERS = {
    ACCEPT: 'Accept',
    AUTHORIZATION: 'Authorization',
    CONTENT_TYPE: 'Content-Type',
    CONNECTION: 'Connection'
};

const BASE_HEADERS = {
    [HEADERS.ACCEPT]: 'application/json',
    [HEADERS.CONTENT_TYPE]: 'application/json',
    [HEADERS.CONNECTION]: 'Close'
};

const getHeaders = () => {
    const baseHeaders = BASE_HEADERS;
    const tokenCookie = Cookie.getCookieByName('AUTH');

    if (tokenCookie) {
        Object.assign(baseHeaders, {
            [HEADERS.AUTHORIZATION]: tokenCookie
        });
    }

    return baseHeaders;
}

const rejectResponse = (response, error) => {
    error.status = response.status;
    return Promise.reject(error);
};

const parseJson = (response) => {
    return response.json().catch(parseError => rejectResponse(response, parseError))
        .then(
            (json) => (response.ok ? json : Promise.reject(json)),
            (reason) => (response.status === 204 ? {} : rejectResponse(response, reason))
        );
};

const api = {
    get(url) {
        return fetch(url, {
            headers: {
                ...getHeaders()
            },
            method: GET
        }).then(parseJson).catch((error) => Promise.reject(error));
    },
    post(url, payload) {
        return fetch(url, {
            headers: {
                ...getHeaders()
            },
            method: POST,
            ...payload && {
                body: JSON.stringify(payload)
            }
        }).then(parseJson).catch((error) => Promise.reject(error));
    },
    delete(url) {
        return fetch(url, {
            headers: {
                ...getHeaders()
            },
            method: DELETE
        }).then(parseJson).catch((error) => Promise.reject(error));
    }
};

export default api;
