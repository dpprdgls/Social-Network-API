const router = require('express').Router();

const {
    getThoughts,
    getThought,
    createThought,
    updateThought,
    editThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

//Route for http://localhost:3001/api/thoughts
router.route('/').get(getThoughts).post(createThought);

//Route for http://localhost:3001/api/thoughts/thoughtId
router
    .route('/:thoughtId')
    .get(getThought)
    .put(updateThought)
    .delete(deleteThought);

//Route for http://localhost:3001/api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

//Route for http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;