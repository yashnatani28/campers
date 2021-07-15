// const express = require('express');
// const router = express.Router({ mergeParams: true });
// const catchAsync = require('../utils/catchAsync'); // As async error is not caught by express we made a function and then imported it and where ever their is async function use this function
// const ExpressError = require('../utils/expressError');// This is our express error class
// const Review = require('../models/review');// This is our model schema 
// const { reviewSchema } = require('../schema.js'); // JOI schema:)
// const Campground = require('../models/campground');

// const validateReview = (req, res, next) => {
//     const { error } = reviewSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }


// router.post('/', validateReview, catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const campground = await Campground.findById(id);
//     const review = new Review(req.body.review);
//     console.log(review);
//     campground.reviews.push(review);
//     console.log(campground);
//     await review.save();
//     await campground.save();
//     res.redirect(`/campground/${campground._id}`)
// }))

// router.delete('/:reviewid', catchAsync(async (req, res) => {
//     const { id, reviewid } = req.params;
//     await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
//     await Review.findByIdAndDelete(reviewid);
//     res.redirect(`/campground/`)
//     // res.send('Deleting the particular review')
// }))


// module.exports = router;

// const express = require('express');
// const router = express.Router({ mergeParams: true });

// const Campground = require('../models/campground');
// const Review = require('../models/review');

// const { reviewSchema } = require('../schemas.js');


// const ExpressError = require('../utils/ExpressError');
// const catchAsync = require('../utils/catchAsync');

// const validateReview = (req, res, next) => {
//     const { error } = reviewSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }



// router.post('/', validateReview, catchAsync(async (req, res) => {
//     const campground = await Campground.findById(req.params.id);
//     const review = new Review(req.body.review);
//     campground.reviews.push(review);
//     await review.save();
//     await campground.save();
//     req.flash('success', 'Created new review!');
//     res.redirect(`/campgrounds/${campground._id}`);
// }))

// router.delete('/:reviewId', catchAsync(async (req, res) => {
//     const { id, reviewId } = req.params;
//     await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//     await Review.findByIdAndDelete(reviewId);
//     req.flash('success', 'Successfully deleted review')
//     res.redirect(`/campgrounds/${id}`);
// }))

// module.exports = router;

const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;