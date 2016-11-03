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