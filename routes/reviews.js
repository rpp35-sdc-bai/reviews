const express = require('express');
const router = express.Router()

const ReviewService = require('../services/reviewService')
const config = require('../config')

const catchAsync = require('../middleware/catchAsync')

// new instance of service with our connected instance of sequelize passed in
const reviewService = new ReviewService(config.client)

router.get('/', catchAsync( async (req, res, next) => {
    try{
        const response = await reviewService.getReviews(req, res, next)
        res.json(response)
    } catch(err){
        next(err)
    }
}));

// create a new review
router.post('/', catchAsync( async (req, res, next) => {
    try{
        const review = await reviewService.createReview(req, res, next)
        res.status(201).json({message: 'Success'})
    } catch (err) {
        next(err)
    }
}));

// /reviews/meta - return the meta data for a specified product
router.get('/meta', catchAsync( async (req,res,next) => {
    try{
        const r = await reviewService.getMetaData(req,res,next)
        res.json(r)
    }catch (err) {
        next(err)
    }
}));

// mark a review as helpful
router.put('/:review_id/helpful', catchAsync ( async (req,res,next) => {
    try{
        await reviewService.markHelpful(req,res,next)
        res.status(204).send()
    } catch (err) {
        next(err)
    }

}));

// mark a review as reported
router.put('/:review_id/report', catchAsync( async (req,res,next) => {
    try{
        await reviewService.markReport(req,res,next)
        res.status(204).send()
    } catch (err) {
        next(err)
    }
}));



module.exports = router