import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

const client = axios.create({
    baseURL: '/api',
    responseType: 'json'
});

// Remove trailing slash from URL
client.interceptors.request.use(config => {
    const length = config.url.length;

    if (config.url[length - 1] === '/') {
        config.url = config.url.substr(0, length - 1);
    }

    return config;
});

export default client;

/**
 * Wraps the client in a Redux middleware
 */
export function getMiddleware() {
    return axiosMiddleware(client);
}

/**
 * Creates an axios interceptors that ads an Authorization header with the JWT token
 * if the user is logged in
 *
 * @param {Store} store
 */
export function addInterceptorWithStore(store) {
    client.interceptors.request.use(config => {
        const token = store.getState().auth.token;

        if (token) {
            config.headers.common['Authorization'] = `Bearer ${token}`;
        }

        return config;
    });
}
