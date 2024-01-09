const rouuter = require('express').Router();

const router = require('.');
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,

} = require('../../controllers/userController');

//Route for http://localhost:3001/api/users
router.route('/').get(getUsers).post(createUser);


//Route for http://localhost:3001/api/users/:userId
router
    .route('/:userId')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);


//Route for http://localhost:3001/api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;