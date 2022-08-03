const express = require('express');
const Sequelize = require('sequelize');
const colors = require('colors');
const config = require('./config');
const path = require('path');
const {createClient} = require('redis');

require('newrelic');

const app = express()

const port = config.serverPort || 3000;

// connect to database - dont make this async
function connect (db, user, pass, config) {
    const sequelize = new Sequelize(db, user, pass, config)
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

config.client = connect(config.database, config.username, config.password, {
    dialect: 'postgres',
    host: config.options.host,
    port: config.options.port,
    logging:false,
    pool: config.options.pool
});

// ---------------Redis stuff----------
const redisConfig = {
    url: config.redisUrl
}

const client = createClient();

config.redisClient = client;

client.connect()
    .then(result => {
        console.log('Redis Enabled'.yellow)
    })
    .catch(err => {
        console.log("Problem with redis", (err).red);
    })


// make sure you have accept application/json in your headers
// or else you will have no body in your requests
app.use(express.json())

// Loader io Files for testing
app.get('/loaderio-d62c4ec2ad01044dc738afa7b6b37576', (req,res,next) => {
    // the url and file will need to be loaded when recieved from loader io
    res.sendFile(path.join(__dirname, './loaderio-d62c4ec2ad01044dc738afa7b6b37576.txt'));
})
app.get('/loader', (req,res, next) => {
    res.sendFile(path.join(__dirname, './loaderParams.json'));
})

app.use('/reviews', require('./routes/reviews'))
app.use('/utils', require('./routes/utils'))

app.listen(port, () => {
    console.log(`listening on ${port}`.green)
})

// for testing
module.exports = app