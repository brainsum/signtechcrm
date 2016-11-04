import { createStore, applyMiddleware } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import reducers from 'app/reducers/index';
import axios from 'axios';
import { readApiJwt } from 'app/actions/auth';

export default function configureStore() {
    const axiosClient = axios.create({
        baseURL: '/api',
        responseType: 'json'
    });

    // Remove trailing slash from URL
    axiosClient.interceptors.request.use(config => {
        const length = config.url.length;

        if (config.url[length - 1] === '/') {
            config.url = config.url.substr(0, length - 1);
        }

        return config;
    });

    const store = createStore(
        reducers,
        applyMiddleware(
            axiosMiddleware(axiosClient)
        )
    );

    // @todo - find better place for this?
    store.dispatch(readApiJwt());

    return store;
}