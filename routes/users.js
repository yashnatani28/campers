// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');
// const passport = require('passport');

// const ExpressError = require('../utils/ExpressError');
// const catchAsync = require('../utils/catchAsync');


// router.get('/register', (req, res) => {
//     res.render('users/register');
// })

// router.post('/register', catchAsync(async (req, res) => {
//     try {
//         const { email, username, password } = req.body;
//         const user = new User({
//             email,
//             username
//         })
//         const newUser = await User.register(user, password);
//         // res.send(newUser);
//         await newUser.save();
//         req.flash('success', 'Welcome to Yelp-camp');
//         res.redirect('/campgrounds');
//     } catch (e) {
//         req.flash('error', e.message);
//         res.redirect('/register');
//     }
// }))


// router.get('/login', (req, res) => {
//     res.render('users/login');
// })

// router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
//     req.flash('success', 'Welcome Back');
//     const url = req.session.returnTo || '/campgrounds';
//     res.redirect(url);
// })


// router.get('/logout', (req, res) => {
//     req.logOut();
//     req.flash('success', 'GoodBye!!');
//     res.redirect('/campgrounds');
// })
// module.exports = router;


const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

module.exports = router;

