module.exports = {
    notes: async (user, _, { models }) => {
        return await models.Note.find({ author: user._id}).sort({ _id: -1 });
    },
    favorites: async (user, _, { models }) => {
        return await models.User.find({ favoritedBy: user._id}).sort({ _id: -1 });
    }
}