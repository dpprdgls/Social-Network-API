const { User, Thought } = require('../models');

////////////////////////////////////////Error Handler\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const handleError500 = (res, error) => {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}

const handleError404 = (res, message) => {
    res.status(404).json({message: 'Task Failed' });
}



const userController = {
////////////////////////////////////////Get All Users\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    async getUsers(req, res) {
        try {
            const users = await User.find()

            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' });

            res.status(200).json(users);
        } catch (err) {
            handleError500(res, err);
        }
    },

////////////////////////////////////////Get Single User\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    async getUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
                .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v'});
            
                if(!user) {
                    handleError404(res);
                    return;
                }

                res.status(200).json(user);
            } catch (err) {
                handleError500(res, err);
            }
        },

////////////////////////////////////////Create User\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user);
        } catch (err) {
            handleError500(res, err);
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
                handleError404(res);
                return;
            
            }
            res.status(200).json(user);
        } catch (err) {
            handleError500(res, err);
        }
    },

////////////////////////////////////////Delete User\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({
                _id: req.params.thoughtId,
            });
            if(!user) {
                handleError404(res);
                return;
            
            }
            await Thought.deleteMany({ _id: { $in: user.thoughts} });
            res.status(200).json({
                message: 'User and their thoughts successfully deleted'
            });

        } catch (err) {
            handleError500(res, err);
        }
    },

////////////////////////////////////////Add Friend\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    async addFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate (
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!friend) {
                handleError404(res);
                return;
            
            }
            res.status(200).json(friend);
        } catch (err) {
            handleError500(res, err);
        }
    },

////////////////////////////////////////Delete Friend\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

      async deleteFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!friend) {
                handleError404(res);
                return;
            }
        } catch (err) {
            handleError500(res, err);
        }
    },

}

module.exports = userController;

