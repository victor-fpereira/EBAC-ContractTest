const request = require('supertest');
const { getAcessToken } = require('../lib/utils/request');

const API_URL = process.env.API_URL;

describe('(HealthCheck) List orders', () => {

    let token;

    beforeAll(async () => {
        token = await getAcessToken('admin', 'admin');
    });

    it ('Should list all orders', () => {
        request(API_URL)
            .get('/orders')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /json/)
    });
});