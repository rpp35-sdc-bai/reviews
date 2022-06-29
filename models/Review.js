const {Sequelize, DataTypes, Model} = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config);

const Review = sequelize.define('Review', {
    review_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    product_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    summary: {
        type: DataTypes.STRING(500)
    },
    recommended: {
        type: DataTypes.BOOLEAN
    },
    response: {
        type:DataTypes.STRING(500)
    },
    body: {
        type: DataTypes.STRING(500)
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    reported: {
        type: DataTypes.BOOLEAN
    },
    reviewer_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reviewer_email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    helpfulness: {
        type: DataTypes.INTEGER
    },
    rating: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    tableName: 'reviews',
    modelName: 'Review'
});
// this will create the table if it does not exist evertime this model is used
(async () => {
    try{
        await Review.sync()
        console.log('Review Synced')
    } catch (err) {
        console.log(err)
    }
})()

module.exports = Review