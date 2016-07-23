import { combineReducers } from 'redux';
import todoApp from '../reducers';

export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        // Add sync reducers here
        todoApp,
        ...asyncReducers
    })
};


export const injectReducer = (store, { key, reducer }) => {
    store.asyncReducers[key] = reducer;
    store.asyncReducers(makeRootReducer(store.asyncReducers))
};

export default makeRootReducer;