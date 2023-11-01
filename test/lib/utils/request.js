import 'dotenv/config'
const request = require('supertest');


const API_URL = process.env.API_URL;

let getAcessToken = (user, password) => {

    return request(API_URL)
        .post('/login')
        .send({
            "username": user,
            "password": password
        })
        .set('Accept', 'application/json')
        .then(response => {
            return 'Bearer ' + response.body.accessToken;
        })
}

module.exports = { getAcessToken }