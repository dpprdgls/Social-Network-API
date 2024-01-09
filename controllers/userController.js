const { User, Thought } = require('../models');

////////////////////////////////////////Error Handler\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const handleError = (res, error) => {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}



////////////////////////////////////////Get All Users\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const userController = {
    async getUsers(req, res) {
        try {
            const users = await User.find()

            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' });

            res.status(200).json(users);
        } catch (err) {
            handleError(res, err);
        }
    },

////////////////////////////////////////Get Single User\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    async getUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
                .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v'});
            
                if(!user) {
                    res.status(404).json({ message: 'No user with that ID   ;'})
                }

                res.status(200).json(user);
            } catch (err) {
                handleError(res, err);
            }
        },

////////////////////////////////////////Create User\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user);
        } catch (err) {
            handleError(res, err);
        }
    },

////////////////////////////////////////Update User\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user with this ID' });
            }
            res.status(200).json(user);
        } catch (err) {
            handleError(res, err);
        }
    },

////////////////////////////////////////Delete User\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    async deleteUser(req, res) {
        try {
            

        } catch (err) {
            handleError(res, err);
        }
    },

////////////////////////////////////////Add Friend\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    async addFriend(req, res) {
        try {

        } catch (err) {
            handleError(res, err);
        }
    },

////////////////////////////////////////Delete Friend\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

      async deleteFriend(req, res) {
        try {

        } catch (err) {
            handleError(res, err);
        }
    },

}

module.exports = userController;