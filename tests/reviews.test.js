const mocha = require('mocha');
const chai = require('chai');
const {expect, should} = chai;


const Entity = require('../models/Entity');

describe('Review Tests', () => {
    describe("Setup", () => {
        it('Should be able to run a test', () => {
            expect(true).to.equal(true)
        })
    })
})

describe('Database Entity Tests', () => {
    let reviews = ''

    beforeEach(() => {
        reviews = new Entity('reviews', 'review_id')
    })

    it('Should be able to connect to the database', async () => {
        const res = await reviews.findAll();
        console.log(res)
        expect(typeof(res)).to.be.a('object');
    })
})