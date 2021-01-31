const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const Note = require('../models/note')
require('../config/db');

const port = process.env.PORT || 4000;

let notes = [
    { id: '1', content: 'This is a note', author: 'Adam Scott' },
    { id: '2', content: 'This is another note', author: 'Harlow Everly' },
    { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
];

const typeDefs = gql `
    type Note {
        id: ID!
        content: String!
        author: String!
    }
    type Query {
        notes: [Note!]!
        note(id: ID!): Note!
    }
    type Mutation {
        newNote(content: String!): Note!
    }
`;

//fieldName(argument: in_type): out_type

const resolvers = {
    Query: {
        notes: async () => {
            return await Note.find({});
        },
        note: async (_, args) => {
            return await Note.findById(args.id);
        }
    },

    Mutation: {
        newNote: async (_, args) => {
            return await Note.create({
                content: args.content,
                author: 'Adam Scott'
            });
        
        }
    }
};

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: '/api'});

//app.get(path, callback function)
//app.get('/', (req, res) => res.send('hello world'));

app.listen({ port }, () => 
    console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}.`)
);
