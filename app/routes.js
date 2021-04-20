const express = require('express');
const router = express.Router();

//Middlewares
const auth = require('./middlewares/auth');

//Controllers
const AuthController = require('./controllers/AuthController');
const PostController = require('./controllers/PostController');

//Home
router.get('/', (req, res) => {
    res.json({hello: 'World!'});
})

//Deux routes: connexion et inscription
// /api/signin & /api/signup
router.post('/api/signin', AuthController.signIn);
router.post('/api/signup', AuthController.signUp);

//Routes des posts
router.get('/api/posts', auth, PostController.index);

module.exports = router;