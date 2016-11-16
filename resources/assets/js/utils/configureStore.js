import { createStore, applyMiddleware } from 'redux';
import ducks from 'app/ducks/index';
import { getMiddleware, addInterceptorWithStore } from 'app/utils/configureAxios';
import { readApiJwt } from 'app/ducks/auth';

export default function configureStore() {
    const store = createStore(
        ducks,
        applyMiddleware(
            getMiddleware()
        )
    );

    // Initial load JWT to store
    store.dispatch(readApiJwt());

    // We need the store for an interceptor
    addInterceptorWithStore(store);

    return store;
}