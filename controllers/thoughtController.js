const { User, Thought } = require('../models');


const thoughtController = {

////////////////////////////////////////Get All Thoughts\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

////////////////////////////////////////Get Single Thought\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    async getThought(req, res) {
        try {
            const thought = await Thought.findOne(req.params.thoughtId);
            if (!thought) {
                res.status(404).json({ message: "No thought found" });
            }
            res.status(200).json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

////////////////////////////////////////Create Thought\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findByIdAndUpdate(
                req.body.userId,
                { $addToSet: {thoughts: thought._id }},
                { runValidator: true, new: true }
            );
            res.status(201).json({ thought, user });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

////////////////////////////////////////Update Thought\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                req.params.thoughtId,
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thought) {
                res.status(404).json({ message: "No thought found" });
            }
            res.status(200).json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
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
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

////////////////////////////////////////Add Reaction\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    async addReaction(req, res){
        try {
            const reaction = await Thought.findOneAndUpdate(
                req.params.thoughtId,
                { $addToSet: { reactions: req.body }},
                { runValidators: true }
            );
            
            if (!reaction) {
                res.status(404).json({ message: "No thought found" });
            }
            res.status(200).json(reaction);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

////////////////////////////////////////Delete Reaction\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\




    
module.exports = thoughtController;
