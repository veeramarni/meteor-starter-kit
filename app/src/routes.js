import { Route } from 'react-router';
import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import todoRoutes from 'TodoApp/client/routes';
import createStore from 'TodoApp/client/store/createStore';

let store;
let history;
let initialState;


// Take the rehydrated state and use it as initial state client side
const rehydrateHook = state => initialState = state;

// Create an enhanced history that syncs navigation events with the store
const historyHook = newHistory => {
    store = createStore(initialState, newHistory);
    return history = syncHistoryWithStore(newHistory, store);
};

// Pass the state of the store as the object to be dehydrated server side
const dehydrateHook = () => store.getState();



// Create a redux store and pass into the redux Provider wrapper
const wrapperHook = app => {
    return (<Provider store={store}>{app}</Provider>)
};


const clientOptions = {historyHook, rehydrateHook, wrapperHook};
const serverOptions = {historyHook, dehydrateHook};

ReactRouterSSR.Run(todoRoutes, clientOptions, serverOptions);




