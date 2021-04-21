const express = require('express');
const router = express.Router();

//Middlewares
const auth = require('./middlewares/auth');

//Controllers
const AuthController = require('./controllers/AuthController');
const PostController = require('./controllers/PostController');
const MessageController = require('./controllers/MessageController');

//Home
router.get('/', (req, res) => {
    res.json({hello: 'World!'});
})

//Routes des Users

//Deux routes: connexion et inscription
// /api/signin & /api/signup
router.post('/api/signin', AuthController.signIn);
router.post('/api/signup', AuthController.signUp);

router.get('/api/search/:name', AuthController.getUserByName);

//Routes des posts
router.get('/api/posts', auth, PostController.index);

//Routes des messages
router.get('/api/messages', MessageController.index);
router.get('/api/messages/:emmetId', MessageController.getMessagesUser);

router.post('/api/messages/nouveaumessage', MessageController.publierMessage);

module.exports = router;