import { createStore, applyMiddleware } from 'redux';
import reducers from 'app/reducers/index';
import { getMiddleware, addInterceptorWithStore } from 'app/utils/configureAxios';
import { readApiJwt } from 'app/actions/auth';

export default function configureStore() {
    const store = createStore(
        reducers,
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