import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
//import todoApp from '../TodoApp/client/reducers';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        // Add sync reducers here
      //  todoApp,
        router,
        ...asyncReducers
    })
};


export const injectReducer = (store, { key, reducer }) => {
    store.asyncReducers[key] = reducer;
    store.asyncReducers(makeRootReducer(store.asyncReducers))
};

export default makeRootReducer;