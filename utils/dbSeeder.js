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
    port: 55001
}


// file paths
const reviewPath = path.resolve(__dirname, '../SeedData/reviews.csv');
const photosPath = path.resolve(__dirname, '../SeedData/reviews_photos.csv');
const characterPath = path.resolve(__dirname, '../SeedData/characteristic_reviews.csv');

async function seed (p) {

    const client = new Client(config)

    async function readCSV (path) {
        // read seed data from files
        fs.createReadStream(path)
            .pipe(csv())
            .on('data', data => {
                insert(data)
            })
            .on('end', () => {
                console.log('reading done')
            })
    }

    // insert into db
    async function insert (record) {
            const {id, review_id, url} = record
            const values = [Number(id), Number(review_id), String(url)];
            const text = `INSERT INTO photos(photo_id, review_id, url) VALUES($1, $2, $3) ;`
            try{
                const res = await client.query(text, values)
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        console.log('End of Insertion'.blue)
    }

    readCSV(p)
}

seed(photosPath);

