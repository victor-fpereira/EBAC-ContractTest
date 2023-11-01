const request = require('supertest');
const { getAcessToken } = require('../lib/utils/request');

const API_URL = process.env.API_URL;

describe('(HealthCheck) List customers', () => {

    let token;

    beforeAll(async () => {
        token = await getAcessToken('admin', 'admin');
    });

    it ('Should list all customers', () => {
        request(API_URL)
            .get('/customers')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /json/)
    });
});