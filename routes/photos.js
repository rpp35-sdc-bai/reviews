const express = require('express');

const router = express.Router()

const Photo = require('../models/Photos');

router.get('/', (req, res, next) => {

})

router.post('/', async (req, res, next) => {
    try{
        const {review_id, url} = req.body
        const photo = Photo.create({review_id, url})
        photo.save()
    } catch (err){
        res.status(500).json({message:`Error`, stack: err})
    }

})

module.exports = router