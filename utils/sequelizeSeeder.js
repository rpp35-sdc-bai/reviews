const Models = require('../models/models')
const ReviewService = require('../services/reviewService')
const config = require('../config');
const Sequelize = require('sequelize');

const colors = require('colors');
const jsonfile = require('jsonfile')

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const async = require('async');

const reviewPath = path.resolve(__dirname, '../seedData/csv/reviews.csv');
const photosPath = path.resolve(__dirname, '../seedData/csv/reviews_photos.csv');
const characterReviewPath = path.resolve(__dirname, '../seedData/csv/characteristic_reviews.csv');
const characterPath = path.resolve(__dirname, '../seedData/csv/characteristics.csv');

// connect to database - dont make this async
function connect (configFile) {
    const sequelize = new Sequelize(configFile)
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

config.client = connect(config.url);

const reviewService = new ReviewService(config.client)

// const reviewTarget = path.resolve(__dirname, '../SeedData/rev.json')

async function readCSV (path, model) {
    // read seed data from files
    fs.createReadStream(path)
        .pipe(csv())
        .on('data', async data => {
            // this date line is for reviews only
            if(model === models[0]){
                data.date = Number(data.date)
            } else if (model === models[1]){
                data.rid = data.review_id
            }
            insert.push(data)

        })
        .on('error', async (err) => {
            console.log(String(err).red)
        })
        .on('end', async () => {
           console.log("Export Complete".blue)
        })

        const insert = async.cargo(async (tasks, callback) => {
            try{
                // Update the model
               await model.bulkCreate(tasks)
            } catch (err) {
                console.log(String(err).red)
            }
        }, 1000)
}

const filePaths = [reviewPath, photosPath, characterReviewPath, characterPath]
const models = [reviewService.models.Review, reviewService.models.Photo, reviewService.models.CharacteristicReview, reviewService.models.Characteristic]

// readCSV(reviewPath, models[0])
// readCSV(photosPath, models[1])
readCSV(characterReviewPath, models[2])
// readCSV(characterPath, models[3])