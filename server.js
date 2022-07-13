const express = require('express');
const Sequelize = require('sequelize');
const colors = require('colors');
const config = require('./config');

const app = express()

const port = config.port || 3000;

// connect to database - dont make this async
function connect (configFile, options) {
    const sequelize = new Sequelize(configFile, options)
    try{
        sequelize.authenticate()
        console.log('Connected'.rainbow)
        return sequelize
    } catch (err) {
        console.log(String(err).red)
        console.log('Exiting'.yellow)
        process.exit(1)
    }
}

config.client = connect(config.url, config.options);

// make sure you have accept application/json in your headers
// or else you will have no body in your requests
app.use(express.json())

// test route
app.get('/', (req,res,next) => {
    res.json({message: 'hello world'})
})

app.use('/reviews', require('./routes/reviews'))
app.use('/utils', require('./routes/utils'))

app.listen(port, () => {
    console.log(`listening on ${port}`.green)
})

// for testing
module.exports = app