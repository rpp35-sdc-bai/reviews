const {Op} = require('sequelize');

async function incrementValue (model, id) {
    // return [results, metaData] = await model.query(`UPDATE ${table} SET ${field} = ${field} + 1 WHERE ${id} = ${value}`)
    const r = await model.update({helpfulness: +1},{
        where:{
            review_id:{
                [Op.eq]: id
            }
        }
    })
    return r
}

async function flipBoolean (model, id, value) {
    // return [results, metaData] = await model.query(`UPDATE ${table} SET ${field} = ${field} + 1 WHERE ${id} = ${value}`)
    const r = await model.update({reported: value},{
        where:{
            review_id:{
                [Op.eq]: id
            }
        }
    })
    return r
}



module.exports = {incrementValue, flipBoolean};