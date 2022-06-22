// transform and seed data into reviews database

const fs = require('fs');
const path = require('path');

// read seed data from files
fs.readFile(path.resolve(__dirname, '../seedData/reviews.csv'), (err, data) => {
    if(err){
        console.log(err)
    } else {
        console.log(data)
    }
});

