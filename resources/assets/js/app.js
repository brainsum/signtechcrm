
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'app/utils/configureStore';
import Layout from 'app/components/Layout';

const root = document.getElementById('root');
const store = configureStore();

render(
    <Provider store={store}>
        <Layout />
    </Provider>,
    root
);