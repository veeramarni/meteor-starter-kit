import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import ApolloClient from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';
import makeRootReducer from './reducers';



export const apolloClient = new ApolloClient({
    meteorClientConfig
});


export default (initialState = {}, history) => {
    // ======================================================
    // Middleware Configuration
    // ======================================================
    const middleware = [thunk, routerMiddleware(history), apolloClient.middleware()];

    // ======================================================
    // Store Enhancers
    // ======================================================
    const enhancers = []
    if (process.env.NODE_ENV !== 'production') {
        //middleware.push(createLogger());
        const devToolsExtension = window.devToolsExtension
        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension())
        }
    }

    // ======================================================
    // Store Instantiation and HMR Setup
    // ======================================================
    const store = createStore(
        makeRootReducer({apollo: apolloClient.reducer()}),
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers
        )
    );
    store.asyncReducers = {};

    if (module.hot){

        module.hot.accept('./reducers', () => {
            console.log("Hot module is available ");
            const reducers = require('./reducers').default;
            store.replaceReducer(reducers(store.asyncReducers));
        })
    }

    return store;
}