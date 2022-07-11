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


const {Op} = require('sequelize')
const colors = require('colors')

async function metaParser (productId, models) {
    console.log((models).red)

    let result = {
        product_id: productId,
        ratings: {

         },
        recommended: {
            0: 0,
            1: 0,
         },
        characteristics: {

        }
    }

    const characters = await models.Characteristic.findAll({
        where: {
            product_id: {
                [Op.eq]: productId
            }
        }
    })

    const reviews = await models.Review.findAll({
        where: {
            product_id: {
                [Op.eq] : productId
            }
        }
    })

    async function formatCharacter () {
        characters.forEach( async (char, index ) => {
            char = char.dataValues
            if(result.characteristics[char.name] === undefined){

                const characterReview = await models.CharacteristicReview.findAll({
                    where: {
                        _id: {
                            [Op.eq]: char._id
                        }
                    }
                })

                result.characteristics[char.name] = {
                    "id": char._id,
                    "value": characterReview[0].dataValues.value
                }
            }
        });
        return await formatData()
    }

    async function formatData () {
        reviews.forEach( async record => {
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
        });
        return result
    }
    const r = await formatCharacter()
    // delay returning while promises resolve
    await new Promise(r => setTimeout(r, 200));
    return r
}

module.exports = metaParser