import { createStore, applyMiddleware } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import reducers from 'app/reducers/index';
import axios from 'axios';

export default function configureStore() {
    const axiosClient = axios.create({
        baseURL: '/api',
        responseType: 'json'
    });

    return createStore(
        reducers,
        applyMiddleware(
            axiosMiddleware(axiosClient)
        )
    );
}