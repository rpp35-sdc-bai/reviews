const express = require('express');

const router = express.Router()

const {Op} = require('sequelize');
const Review = require('../models/Review');

const metaParser = require('../lib/metaParser');
const reviewParser = require('../lib/reviewParser');
const incrementValue = require('../lib/incrementvalue')

const catchAsync = require('../middleware/catchAsync')

router.get('/', catchAsync( async (req, res, next) => {
    const {productId, count, page, sort} = req.params
    if(!productId){
        const err = new Error('No Product Specified')
        next(err)
    }
    try{
        const response = await reviewParser(productId)
        res.json(response)
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

// /reviews/meta - return the meta data for a specified product
router.get('/meta', catchAsync( async (req,res,next) => {
    const {productId} = req.query
    if(!productId){
        const err = new Error('No Product Specified')
        next(err)
    }
    try{
        const r = await metaParser(productId)
        res.json(r)
    }catch (err) {
        next(err)
    }
}));

// mark a review as helpful
router.put('/:review_id/helpful', catchAsync ( async (req,res,next) => {
    const {review_id} = req.params
    try{
        const r = await incrementValue('reviews', 'helpfulness', 'review_id', review_id)
        res.status(204).send()
    } catch (err) {
        next(err)
    }

}));

// mark a review as reported
router.put('/:review_id/report', catchAsync( async (req,res,next) => {
    const {review_id} = req.params
    try{
        const r = await incrementValue('reviews', 'reported', 'review_id', review_id)
        res.status(204).send()
    } catch (err) {
        next(err)
    }
}));



module.exports = router