const {Sequelize, DataTypes, Model} = require('sequelize');
const {INTEGER, STRING, DATE, BOOLEAN} = DataTypes;
const Review = require('./Review');
const config = require('../config');

const sequelize = new Sequelize(config);

const Characteristic = sequelize.define('Characteristic',{
    _id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    product_id:{
        type:INTEGER,
        allowNull: false
    },
    name: {
        type: STRING(50),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'characteristic',
    modelName: 'Characteristic'
});

// this will create the table if it does not exist evertime this model is used
(async () => {
    try{
        await Characteristic.sync()
        console.log('Characteristics Synced')
    } catch (err) {
        console.log(err)
    }
})()

module.exports = Characteristic;