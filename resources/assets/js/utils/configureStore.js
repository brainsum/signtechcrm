import { createStore } from 'redux';

export default function configureStore() {
    const store = createStore(function(state = {
        loggedIn: false
    }, action) {
        switch (action.type) {
            case 'LOGIN':
                return { loggedIn: true };
        }
    });

    return store;
}