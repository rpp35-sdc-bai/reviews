const express = require('express');

const router = express.Router()

const {Op} = require('sequelize');
const Review = require('../models/Review');

const metaParser = require('../lib/metaParser');

const catchAsync = require('../middleware/catchAsync')

router.get('/', catchAsync( async (req, res, next) => {
    const {productId, count, page, sort} = req.params
    if(!productId){
        const err = new Error('No Product Specified')
        next(err)
    }
    try{
        const reviews = await Review.findAll({
            // set the limit to the limit the user specified or 5 (the default)
            limit: count || 5,
            where:{
                product_id:{
                    [Op.eq]: productId
                }
            }
        })
        const response = {
            "product": productId,
            "results": reviews

        }
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
        const reviews = await Review.findAll({
            where: {
                product_id: {
                    [Op.eq] : productId
                }
            }
        })
        const r = metaParser(reviews)
        res.json( r );
    }catch (err) {
        next(err)
    }
}));


module.exports = router