const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');

const models = require('../models');
require('../config/db');

const port = process.env.PORT || 4000;

const typeDefs = require('./schema');

//fieldName(argument: in_type): out_type

const resolvers = require('./resolvers');

const app = express();

app.use(helmet());
app.use(cors());

const getUser = token => {
    if(token){
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        }catch(err) {
            throw new Error('Session invalid');
        }
    }
};

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization;
        const user = getUser(token);
        console.log(user);
        return { models, user };
    }
 });

server.applyMiddleware({ app, path: '/api'});

//app.get(path, callback function)
//app.get('/', (req, res) => res.send('hello world'));

app.listen({ port }, () => 
    console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}.`)
);
