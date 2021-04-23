const express = require('express');
const router = express.Router();

//Middlewares
const auth = require('./middlewares/auth');

//Controllers
const AuthController = require('./controllers/AuthController');
const PostController = require('./controllers/PostController');
const MessageController = require('./controllers/MessageController');
const UserController = require('./controllers/UserController');
const AmiController = require('./controllers/AmiController');

//Home
router.get('/', (req, res) => {
    res.json({hello: 'World!'});
})

//Deux routes: connexion et inscription
// /api/signin & /api/signup
router.post('/api/signin', AuthController.signIn);
router.post('/api/signup', AuthController.signUp);

//Routes des Utilisateurs
router.get('/api/search/:name', UserController.getUserByName);
router.get('/api/getUser/:id', UserController.getUserById);

//Routes des posts
router.get('/api/posts', auth, PostController.index);

//Routes des messages
router.get('/api/messages', MessageController.index);
router.get('/api/messages/:destiId', MessageController.getMessagesUser);

router.post('/api/messages/nouveaumessage', MessageController.publierMessage);

//Routes des amis
router.get('/api/getDemandesAmi/:id', AmiController.getFriendRequests);
router.get('/api/getAmis/:id', AmiController.getFriends);

router.post('/api/demandeAmi', AmiController.demanderEnAmi);
router.patch('/api/accepterInvitation', AmiController.accepterInvitation);

module.exports = router;