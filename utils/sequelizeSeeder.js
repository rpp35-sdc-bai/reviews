const Review = require('../models/Review');
const Photo = require('../models/Photos');
const CharacteristicReview = require('../models/ReviewCharacteristic');
const Characteristic = require('../models/Characteristic');

const colors = require('colors');
const jsonfile = require('jsonfile')

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const async = require('async');

const reviewPath = path.resolve(__dirname, '../SeedData/reviews.csv');
const photosPath = path.resolve(__dirname, '../SeedData/reviews_photos.csv');
const characterReviewPath = path.resolve(__dirname, '../SeedData/characteristic_reviews.csv');
const characterPath = path.resolve(__dirname, '../SeedData/characteristics.csv');

const result = []

// const reviewTarget = path.resolve(__dirname, '../SeedData/rev.json')

async function readCSV (path, model) {
    // read seed data from files
    fs.createReadStream(path)
        .pipe(csv())
        .on('data', async data => {
            // this date line is for reviews only
            // data.date = Number(data.date)
            insert.push(data)
        })
        .on('end', async () => {
           console.log("Export Complete".blue)
        })
}

const insert = async.cargo(async (tasks, callback) => {
    try{
        // Update the model
       await Characteristic.bulkCreate(tasks)
    } catch (err) {
        console.log(err)
    }
}, 1000)


const filePaths = [reviewPath, photosPath, characterReviewPath, characterPath]
const models = [Review, Photo, CharacteristicReview, Characteristic]

// readCSV(reviewPath, Review)
// readCSV(photosPath, Photo)
// readCSV(characterReviewPath, CharacteristicReview)
readCSV(characterPath, Characteristic)