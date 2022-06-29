const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize');

const config = require('../config');


router.get('/reset', async (req,res,next) => {
    try{
        const sequelize = await new Sequelize(config)
        sequelize.sync({force:true})
        res.json({message: 'Success'})
    } catch (err) {
        res.status(500).json({message: "Error", stack: err})
    }
})


module.exports = router