// this middleware should check redis for a value before queriying the database for it
const client = require('../config').redisClient;

async function checkCache (req,res,next) {
    let result = null
    try{
        const {product_id} = req.query
        result = await client.get(product_id)

        // respond with data if any is found
        if(result){
            res.json(JSON.parse(result))
        } else {
            next()
        }
    }
    catch(err){
        next(err)
    }
}

module.exports = checkCache;