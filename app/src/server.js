//import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
//import { createApolloServer } from 'meteor/apollo';
//
//import 'TodoApp/server/server';
//// Do server-rendering only in production
//// Otherwise, it will break the hot-reload
//// DO NOT REMOVE THIS LINE TO TEST, use: meteor --production
//if (process.env.NODE_ENV === 'production') {
//    // Load Webpack infos for SSR
//    ReactRouterSSR.LoadWebpackStats(WebpackStats);
//
//    require('./routes').default;
//}
//

import { createApolloServer } from 'meteor/apollo';

import { schema, resolvers } from 'TodoApp/imports/api/schema';

createApolloServer({
    graphiql: true,
    pretty: true,
    schema,
    resolvers,
});
