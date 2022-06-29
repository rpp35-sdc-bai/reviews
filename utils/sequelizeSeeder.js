const Review = require('../models/Review');
const Photo = require('../models/Photos');
const Characteristic = require('../models/Characteristic');

const colors = require('colors');


const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const reviewPath = path.resolve(__dirname, '../SeedData/reviews.csv');
const photosPath = path.resolve(__dirname, '../SeedData/reviews_photos.csv');
const characterPath = path.resolve(__dirname, '../SeedData/characteristic_reviews.csv');

const result = []

async function readCSV (path, model) {
    // read seed data from files
    fs.createReadStream(path)
        .pipe(csv())
        .on('data', async data => {
            // pass to database line by line
            // not very efficient
            data.date = Number(data.date)
            result.push(data)
        })
        .on('end', async () => {
            try{
                await fs.writeFileSync('../SeedData/rev.json', JSON.stringify(result),'utf8')
                console.log('Export Finished'.blue)
            } catch(err){
                console.log('Error'.red, err)
            }
        })
}



async function insert (model, data) {
   await model.create(data)
}

const filePaths = [reviewPath, photosPath, characterPath]
const models = [Review, Photo, Characteristic]

readCSV(reviewPath, Review)
// readCSV(photosPath, Photo)