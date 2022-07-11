const express = require('express')
const router = express.Router()

const config = require('../config')

const ReviewService = require('../services/reviewService');

const reviewService = new ReviewService(config.client)

// Drop everything and re-sync all the tables
router.get('/reset', async (req,res,next) => {
    try{
        await reviewService.reset()
        res.json({message: 'Success'})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Error", stack: err})
    }
})

// not sure I can do all the tables as once with out running out of ram
// might need to split this up table by table


// run the seeder
router.get('/seed', (req,res,next) => {

})

module.exports = router