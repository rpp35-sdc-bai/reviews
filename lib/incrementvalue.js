const {Op} = require('sequelize');
const {sequelize} = require('../models/sequelize')

async function incrementValue (table, field, id, value) {
    return [results, metaData] = await sequelize.query(`UPDATE ${table} SET ${field} = ${field} + 1 WHERE ${id} = ${value}`)
}

module.exports = incrementValue;