const Sequelize = require('sequelize');
const colors = require('colors');
const config = require('../config');


const sequelize = new Sequelize(config)

async function connect() {
    try{
        await sequelize.authenticate()
        console.log('Sequelize Connected'.blue);
        await sequelize.sync();
        console.log('Synced')
    } catch (err) {
        console.error('Sequlize Connection Failed'.red);
        console.log(err)
    }
}

module.exports = {connect, sequelize}