module.exports = {
    newNote: async (_, args, { models }) => {
        return await models.Note.create({
            content: args.content,
            author: 'Adam Scott'
        });
    
    }
}