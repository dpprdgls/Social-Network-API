const { User, Thought } = require('../models');

const handleError = (res, err) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
};

const thoughtController = {

////////////////////////////////////////Get All Thoughts\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts);
        } catch (err) {
            handleError(res, err);
        }
    },

////////////////////////////////////////Get Single Thought\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    async getThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if (!thought) {
                res.status(404).json({ message: "No thought found" });
            }
            res.status(200).json(thought);
        } catch (err) {
            handleError(res, err);
        }
    },

////////////////////////////////////////Create Thought\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findByIdAndUpdate(
                req.body.userId,
                { $addToSet: {thoughts: thought._id }},
                { runValidators: true, new: true }
            );
            res.status(201).json({ thought, user });
        } catch (err) {
            handleError(res, err);
        }
    },

////////////////////////////////////////Update Thought\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thought) {
                res.status(404).json({ message: "No thought found" });
            }
            res.status(200).json(thought);
        } catch (err) {
            handleError(res, err);
        }
    },

////////////////////////////////////////Delete Thought\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({
                _id: req.params.thoughtId
            });

            if(!thought){
                res.status(404).json({ message: "No thought found" });
            }
            res.status(200).json({ message: "Thought and associated reactions successfully deleted."});
        } catch (err) {
            handleError(res, err);
        }
    },

////////////////////////////////////////Add Reaction\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    async addReaction(req, res){
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body }},
                { runValidators: true }
            );
            
            if (!reaction) {
                res.status(404).json({ message: "No thought found" });
            }
            res.status(200).json(reaction);
        } catch (err) {
            handleError(res, err);
        }
    },

////////////////////////////////////////Delete Reaction\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    async deleteReaction(req, res) {
        try {
            const { thoughtId, reactionId } = req.params;

            const reaction = await Thought.findOneAndUpdate(
                {_id: thoughtId },
                { $pull: { reactions: { id: reactionId } } },
                { runValidators: true, new: true }
            );

            if (!reaction) {
                res.status(404).json( { message: "No reaction found" });
            }
            res.status(200).json(reaction);
        } catch (err) {
            handleError(res, err);
        }
    }
};


    
module.exports = thoughtController;
