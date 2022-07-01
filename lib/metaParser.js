// parse data into the strucutre of the meta data

// {
//     "product_id": "2",
//     "ratings": {
//       2: 1,
//       3: 1,
//       4: 2,
//       // ...
//     },
//     "recommended": {
//       0: 5
//       // ...
//     },
//     "characteristics": {
//       "Size": {
//         "id": 14,
//         "value": "4.0000"
//       },
//       "Width": {
//         "id": 15,
//         "value": "3.5000"
//       },
//       "Comfort": {
//         "id": 16,
//         "value": "4.0000"
//       }
// }

const Characteristic = require('../models/Characteristic')
const {Op} = require('sequelize')

function metaParser (collection) {
    let result = {
        ratings: { },
        recommended: {
            true: 0,
            false: 0,
         },
        characteristics: {

        }
    }
    console.log(collection[2].recommended)
    collection.forEach( async record => {
        // structure the ratings
        if(!result.ratings[record.rating]){
            result.ratings[record.rating] = 0
        }
        result.ratings[record.rating] += 1

        // structure recommended
        if (!result.recommended[record.recommended] && record.recommended !== null) {
            result.recommended[record.recommended] += 1
        }
        // if (record.recommended !== null){
        //     result.recommended[record.recommended] += 1
        // }
        try {
            const character = await Characteristic.findAll({
                where: {
                    review_id: {
                        [Op.eq]: record.review_id
                    }
                }
            })
            console.log(character)
        } catch (err) {
            console.log("SQL ERROR", err)
        }

    })

    return result
}

module.exports = metaParser