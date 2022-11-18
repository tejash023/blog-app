const express = require('express');
const { append } = require('express/lib/response');

const router = express.Router();
const passport = require('passport');

const blogController = require('../controllers/blog_controller');

console.log('Router Loaded');

//homepage
router.get('/', blogController.displayblog);

router.get('/add-blog', passport.checkAuthetication, blogController.addBlog);

router.post('/add-blog', blogController.createBlog);

router.get('/delete-blog', passport.checkAuthetication, blogController.deleteBlog);

router.get('/liked-blog',passport.checkAuthetication, blogController.blogReact);

router.get('/sign-up',blogController.signup);

router.get('/login', blogController.login);

router.post('/create', blogController.createUser);

//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
  'local',
  {failureRedirect : '/login'},
) ,blogController.createSession);

//google
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}),blogController.createUser);


router.get('/sign-out', blogController.destroySession);


module.exports = router;