const {Sequelize, DataTypes, Model} = require('sequelize');
const {INTEGER, STRING, DATE, BOOLEAN} = DataTypes;
const Review = require('./Review');
const config = require('../config');

const sequelize = new Sequelize(config);

const CharacteristicReview = sequelize.define('CharacteristicReview',{
    _id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    characteristic_id:{
        type:INTEGER,
        allowNull: false
    },
    review_id: {
        type: INTEGER,
        allowNull: false,
        references:{
            model: 'reviews',
            key: 'review_id'
        }
    },
    value: {
        type: INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'characteristic_reviews',
    modelName: 'CharacteristicReview'
});

// this will create the table if it does not exist evertime this model is used
(async () => {
    try{
        await CharacteristicReview.sync()
        console.log('Characteristic Reviews Synced')
    } catch (err) {
        console.log(err)
    }
})()

module.exports = CharacteristicReview;