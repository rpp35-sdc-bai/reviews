const express = require('express');

const router = express.Router()

const Review = require('../models/Review');

const catchAsync = require('../middleware/catchAsync')

router.get('/', catchAsync( async (req, res, next) => {
    try{
        const reviews = await Review.findAll()
        res.json({data: reviews})
    } catch(err){
        next(err)
    }

}));

// create a new review
router.post('/', catchAsync( async (req, res, next) => {
    try{
    const {
        review_id,
        product_id,
        summary,
        body,
        response,
        recommended,
        reported,
        date,
        reviewer_email,
        reviewer_name,
        helpfulness
        } = req.body
        const review = Review.create({review_id, product_id, summary, body, response, recommended, reported, date, reviewer_email, reviewer_name, helpfulness})
        res.status(201).json({message: 'Success'})
    } catch (err) {
        next(err)
    }
}));

module.exports = router