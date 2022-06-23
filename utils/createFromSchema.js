// postgres schema and setup commands

// right now "CREATE DATABASE 'reviews'" needs to be run in the PSQL console

const {Client} = require('pg')
// colors for pretty messages
const colors = require('colors')

// Connection config
const config = {
    user: 'postgres',
    password: 'postgrespw',
    host: 'localhost',
    database: 'reviews',
    port: 55001
}

const client = new Client(config)

// attempt connection
async function connection () {
    try{
        await client.connect()
        console.log('Connection Success'.blue)
        console.log('Attempting to create schema'.yellow)
        // Create tables
        await createSchema()
    } catch (err) {
        console.log("Encountered ERROR:".red, err)
    }
}


// hopefully this should create the schema for all the tables
async function createSchema () {
    try{
        const createReviewTable = {
            text: `CREATE TABLE reviews (
                review_id INT UNIQUE NOT NULL,
                summary CHAR[100],
                recommended BOOL,
                response INT,
                body CHAR[255],
                date DATE NOT NULL,
                reviewer_name CHAR[50] NOT NULL,
                helpfullness INT,
                PRIMARY KEY(review_id)
            ) ;`,
            name: 'reviews'
        }

        const createPhotosTable = {
            text: `CREATE TABLE photos (
                photo_id INT UNIQUE NOT NULL,
                review_id INT NOT NULL,
                url CHAR[255],
                PRIMARY KEY (photo_id),
                CONSTRAINT fk_reviews
                    FOREIGN KEY(review_id)
                        REFERENCES reviews(review_id)
            ) ;`,
            name: 'photos'
        }

        const createCharacteristicsTable = {
            text: `CREATE TABLE characteristics (
                _id INT UNIQUE NOT NULL,
                characteristic_id INT NOT NULL,
                review_id INT NOT NULL,
                value INT NOT NULL,
                PRIMARY KEY(_id),
                CONSTRAINT fk_characteristic
                    FOREIGN KEY(review_id)
                        REFERENCES reviews(review_id)
            ) ;`,
            name: 'characteristics'
        }

        const createRatingsTable = {
            text: `CREATE TABLE ratings (
                rating_id INT UNIQUE NOT NULL,
                review_id INT NOT NULL,
                value INT NOT NULL,
                PRIMARY KEY(rating_id),
                CONSTRAINT fk_rating
                    FOREIGN KEY(review_id)
                        REFERENCES reviews(review_id)
            ) ;`,
            name: 'ratings'
        }

        const tables = [createReviewTable, createPhotosTable, createCharacteristicsTable, createRatingsTable]

        // run all the queuires
        for(let table in tables){
            try{
                await client.query(tables[table])
                console.log(`**Created ${tables[table].name}`.yellow)
            } catch(err){
                throw err
            }
        }
        console.log('Ran Tables Queries without error'.blue)
    } catch(err){
        throw err
    }
}

connection();


