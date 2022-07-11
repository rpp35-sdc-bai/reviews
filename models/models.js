// move all the models into one file to make associations work

const {DataTypes} = require("sequelize");
const {INTEGER, STRING, BOOLEAN, DATE} = DataTypes

// takes the instance of sequelize stored in config.client
module.exports = (sequelize) => {

    const Review = sequelize.define('Review', {
        review_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
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
        modelName: 'Review',
        timestamps: false
    });

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
            type: STRING
        }
    }, {
        sequelize,
        tableName: 'photos',
        modelName: 'Photo',
        timestamps: false
    });

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
        modelName: 'Characteristic',
        timestamps: false
    });

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
        modelName: 'CharacteristicReview',
        timestamps: false
    });
    

    Review.hasMany(Photo, {as: 'photos'})
    // stands for review id
    Photo.belongsTo(Review, {
        foreignKey: {
            name: 'rid',
            allowNull: false
          },
        as: 'review'
    })

    sequelize.sync({alter: true});
}