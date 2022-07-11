const {Op} = require('sequelize')
const Models = require('../models/models');
const colors = require('colors')

const metaParser = require('../lib/metaParser');
const {incrementValue, flipBoolean} = require('../lib/incrementvalue');

// again takes our stored instance of sequlize
class ReviewService {
    constructor(sequelize){
        Models(sequelize);
        this.client = sequelize;
        this.models = sequelize.models;
    }

    // get all the reviews related to a product id
    async getReviews (req, res, next) {
        const {productId, count = 5, page = 0, sort} = req.query
        if(!productId){
            const err = new Error('No Product Specified')
            next(err)
        }
        try{
            const reviews = this.models.Review.findAll({
                include:[{
                    model: this.models.Photo,
                    foreignKey: 'rid',
                    as: 'Photos',
                    attributes: ['url', 'review_id']
                }],
                where: {
                    product_id:{
                        [Op.eq]: productId
                    }
                }
            })
            return reviews
        } catch (err) {
            return err
        }
    }

    // create review
    async createReview (req,res,next) {
        console.log(req.body)
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
        try{
            const review = await this.models.Review.create({
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
            })
            return {messsage: 'success', code: 201, review}
        } catch (err) {
            const error = new Error(err)
            throw error
        }

    }

    // report metaData for a product Id
    async getMetaData (req,res,next) {
        const {productId} = req.query
        if(!productId){
            const err = new Error('No Product Specified')
            next(err)
        }
        try{
            const data = await metaParser(productId, this.models)
            return data
        } catch (err) {
            next(err)  
        }

    }

    async markHelpful (req,res,next) {
        const {review_id} = req.params
        try{
            const r = await incrementValue(this.models.Review, review_id)
            console.log((r).yellow)
            return r
        } catch (err) {
            next(err)
        }
    } 

    async markReport (req,res,next) {
        const {review_id} = req.params
        try{
            const r = await flipBoolean(this.models.Review, review_id, true)
            console.log(r)
            return r
        } catch (err) {
            next(err)
        }
    }

    // custom query passthrough for raw SQL queries
    async query (q) {
        try{
        return await this.client.query(q)
        } catch (err) {
            return err
        }
    }

    // re-sync all the tables
    async reset () {
        try{
            await this.client.sync({force:true, alter: true})
            return
        } catch (err){
            throw err
        }
    }

}

module.exports = ReviewService;
