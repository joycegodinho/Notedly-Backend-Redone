const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
require('dotenv').config();
const mongoose = require('mongoose');

module.exports = {
    newNote: async (_, args, { models, user }) => {
        if (!user) {
            throw new AuthenticationError('You must be signed in to create a note');
        }
        return await models.Note.create({
            content: args.content,
            author: mongoose.Types.ObjectId(user.id)
        });
    
    },

    updateNote: async (_, { id, content }, { models, user }) => {
        if (!user){
            throw new AuthenticationError('You must be signed in to update a note')
        }
        let note = await models.Note.findById(id);
        if (note && String(note.author) !== user.id) {
            throw new ForbiddenError("You don't have permission to update this note")
        }
        try{
            return await models.Note.findByIdAndUpdate(id, { $set: { content }}, {new: true });

        }catch(err){
            return err;

        }
        

    },

    deleteNote: async (_, { id }, { models, user }) => {
        if (!user){
            throw new AuthenticationError('You must be signed in to delete a note')
        }
        const note = await models.Note.findById(id);
        if (note && String(note.author) !== user.id) {
            console.log(note.author)
            throw new ForbiddenError("You don't have permission to delete this note")
        }
        try{
            await note.remove();
            return true;

        }catch(err){
            return false;

        }
    },

    toggleFavorite: async (_, { id }, { models, user }) => {
        if (!user){
            throw new AuthenticationError();
        }
        let noteCheck = await models.Note.findById(id);
        const hasUser = noteCheck.favoritedBy.indexOf(user.id);

        if (hasUser >= 0){ 
            return await models.Note.findByIdAndUpdate(
                id, 
                {$pull: {favoritedBy: mongoose.Schema.Types.ObjectID(user.id)}, $inc: {favoriteCount: -1}},
                {new: true}
                );
        } else {
            return await models.Note.findByIdAndUpdate(
                id, 
                {$push: {favoritedBy: mongoose.Schema.Types.ObjectID(user.id)}, $inc: {favoriteCount: 1}},
                {new: true}
                );
        }
    },

    signUp: async (_, { username, email, password }, { models }) => {
        email = email.trim().toLowerCase();
        const hashed = await bcrypt.hash(password, 10);
        try{
            const user = await models.User.create({ 
                username,
                email,
                password: hashed
            });
            return jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        }catch(err){
            console.log(err);
            throw new Error ('Error creating account');

        }

    },
    signIn: async (_, { username, email, password }, { models }) => {
        if (email) {
            email = email.trim().toLowerCase();
        }
        const user = await models.User.findOne({ $or: [{ email }, { username }]});
       if (!user) {
           throw new AuthenticationError('Error signing in');
       }
       const valid = await bcrypt.compare(password, user.password);
       if (!valid){
           throw new AuthenticationError('Error signing in');
       }
       return jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    }
}