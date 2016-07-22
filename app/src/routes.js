import { Route, browserHistory } from 'react-router';
import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import todoRoutes from 'TodoApp/client/routes';
import createStore, { apolloClient } from './store/createStore';
import { ApolloProvider } from 'react-apollo';

let store;


const historyHook = browserHistory;

// Create a redux store and pass into the redux Provider wrapper
const wrapperHook = app => {
    store = createStore({}, historyHook);
    return <ApolloProvider store={store} client={apolloClient}>{app}</ApolloProvider>
};

// Pass the state of the store as the object to be dehydrated server side
const dehydrateHook = () => store.getState();

// Take the rehydrated state and use it as initial state client side
// const rehydrateHook = state => initialState = state;


const clientOptions = { historyHook, wrapperHook };
const serverOptions = { historyHook, dehydrateHook };

ReactRouterSSR.Run(todoRoutes, clientOptions, serverOptions);

