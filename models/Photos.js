const {Sequelize, DataTypes, Model} = require('sequelize');
const {INTEGER, STRING, DATE, BOOLEAN} = DataTypes;
const Review = require('./Review')
const config = require('../config');

const sequelize = new Sequelize(config);

const Photo = sequelize.define('Photo',{
    photo_id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    review_id:{
        type: INTEGER,
        allowNull: false,
        references: {
            model: 'reviews',
            key: 'review_id'
        }
    },
    url: {
        type:STRING
    }
}, {
    sequelize,
    tableName: 'photos',
    modelName: 'Photo'
});
// this will create the table if it does not exist evertime this model is used
(async () => {
    try{
        await Photo.sync()
        console.log('Photos Synced')
    } catch (err) {
        console.log(err)
    }
})()


module.exports = Photo;