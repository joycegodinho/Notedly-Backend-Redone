const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const models = require('../models');
require('../config/db');

const port = process.env.PORT || 4000;

const typeDefs = require('./schema');

//fieldName(argument: in_type): out_type

const resolvers = require('./resolvers');

const app = express();

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: () => {
        return { models };
    }
 });

server.applyMiddleware({ app, path: '/api'});

//app.get(path, callback function)
//app.get('/', (req, res) => res.send('hello world'));

app.listen({ port }, () => 
    console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}.`)
);
