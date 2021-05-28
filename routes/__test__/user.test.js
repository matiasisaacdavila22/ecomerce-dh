const request = require('supertest');
const app = require('../../index');

it('Can send emails with valid inputs', async () => {
    return request(app)
    .post('/email')
    .send({
        to:'mipcomputacion@gmail.com',
        subject: ' subject',
        text: 'some random text',
        html:'<strong>Some random html code</strong><br><h1>casas</h1>',
        sandboxMode: false
    })
    .expect(201);
})