// transform and seed data into reviews database

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const {Client} = require('pg');
const colors = require('colors');

// Connection config
const config = {
    user: 'postgres',
    password: 'postgrespw',
    host: 'localhost',
    database: 'reviews',
    port: 55002
}


// file paths
const reviewPath = path.resolve(__dirname, '../SeedData/reviews.csv');
const photosPath = path.resolve(__dirname, '../SeedData/reviews_photos.csv');
const characterPath = path.resolve(__dirname, '../SeedData/characteristic_reviews.csv');

// insertion queries for each table - used by the insert function
// paths and varbles need to be manually switch for each table right now
const photoQuery = (record) =>  {
    const {id, review_id, url} = record

    const query = {
        text: `INSERT INTO photos(photo_id, review_id, url) VALUES($1, $2, $3)`,
        values: [id, review_id, url]
    }

    return query
}

// review query
const reviewQuery = (record) =>  {

    // deconstruct values from provided data
    const {
            id,
            product_id,
            summary,
            body,
            response,
            recommended,
            reported,
            date,
            reviewer_email,
            reviewer_name,
            helpfulness
            } = record

    const formatedDate = new Date(Number(date)).toISOString()

    const query = {
        // do not format the query programatically or it looks weird in the console
        text: `INSERT INTO reviews(review_id, product_id, summary, body, response, recommended, reported, date, reviewer_name, reviewer_email, helpfulness)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        values: [id, product_id, summary, body, response, recommended, reported, formatedDate, reviewer_name, reviewer_email, helpfulness]
    }
    // return the query object hopefully filed with values
    return query
}

const characterisicQuery = (record) => {
    const {id, characteristic_id, review_id, value} = record

    const query = {
        text: `INSERT INTO characteristics(_id, characteristic_id, review_id, value) VALUES($1, $2, $3, $4)`,
        values: [id, characteristic_id, review_id, value]
    }

    return query
}


async function seed (p, q) {

    // setup new connection
    const client = new Client(config)
    // actually connect to the DB - do not forget this line
    client.connect();

    async function readCSV (path) {
        // read seed data from files
        fs.createReadStream(path)
            .pipe(csv())
            .on('data', data => {
                // pass to database line by line
                // not very efficient
                insert(q(data))
            })
            .on('end', () => {
                console.log('reading done')
            })
    }

    // insert into db
    async function insert (query) {
        try{
            const res = await client.query(query)
            console.log(res.rows[0])
        } catch (err) {
            console.log('ERROR:'.red, err)
        }
        console.log('End of Insertion'.blue)
    }

    readCSV(p)
}

// specify path to file and query callback
seed(characterPath, characterisicQuery);

