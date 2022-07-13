const mocha = require('mocha');
const chai = require('chai');
const {expect, should} = chai;
const request = require('supertest');

const app = require('../server');

describe('Review Tests', () => {
    describe("Setup", () => {
        it('Should be able to run a test', () => {
            expect(true).to.equal(true)
        })
    })
})

describe('Database Connection Tests', function () {
    this.timeout(3000)

    it('Should be able to connect to the database', async (done) => {
        request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        done()
    })
})

describe('Route Checks', function () {
    this.timeout(3000)

    it('Should have the route GET /reviews', () => {
        request(app)
        .get('/reviews?product_id=2')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            const data = JSON.parse(res.text)
            expect(data.product).to.equal(2)
            expect(Array.isArray(data.results))
        })
    })

    it('Should have the route POST /reviews', () => {

        const data = {
            product_id: 23123123124141,
            summary: "this is a test",
            body: "this is a test",
            response: "still a test",
            recommended: false,
            reported: false,
            date: Date.now(),
            reviewer_email: "stillatest@test.com",
            reviewer_name: 'test boi',
            helpfulness: 1
        }

        request(app)
        .post('/reviews')
        .send(data)
        .expect(201)
    })

    it('Should have the route GET /reviews/meta', () => {
        request(app)
        .get('/reviews/meta/product_id=2')
        .expect(200)
        .expect('Content-type', /json/)
        .then(res => {
            const data = JSON.parse(res.text)
            expect(data.product_id).to.equal(2)
            expect(typeof(data.ratings)).to.equal('object')
            expect(typeof(data.recommended)).to.equal('object')
            expect(typeof(data.characteristics)).to.equal('object')
        })
    })

    it('Should have the route PUT /reviews/:review_id/helpful',() => {
        request(app)
        .put('/reviews/421816/helpful')
        .expect(204)
    })

    it('Should have the route PUT /reviews/:review_id/report',() => {
        request(app)
        .put('/reviews/421816/report')
        .expect(204)
    })
})