'use strict';

const { server } = require('../src/server');
const { db } = require('../src/models/index');
const supertest = require('supertest');

const request = supertest(server);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe('Server', () => {
  test('Signup', async () => {
    let response = await request.post('/signup').send({
      username: 'Test',
      password: 'Test',
      role: 'admin',
    });

    expect(response.status).toEqual(201);
    expect(response.body.user.username).toEqual('Test');
  });

  test('Signin', async () => {
    let response = await request.post('/signin').auth('Test', 'Test');

    expect(response.status).toEqual(200);
    expect(response.body.user.username).toEqual('Test');
  });

});