const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize');

const config = require('../config');

// re-sync all the tables
router.get('/reset', async (req,res,next) => {
    try{
        const sequelize = await new Sequelize(config)
        sequelize.sync({force:true})
        res.json({message: 'Success'})
    } catch (err) {
        res.status(500).json({message: "Error", stack: err})
    }
})

// not sure I can do all the tables as once with out running out of ram
// might need to split this up table by table


// run the seeder
router.get('/seed', (req,res,next) => {

})

module.exports = router