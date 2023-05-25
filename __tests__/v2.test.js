'use strict';

const { server } = require('../src/server');
const { db, users } = require('../src/models/index');
const supertest = require('supertest');

const request = supertest(server);
let adminTest;

beforeAll(async () => {
  await db.sync();
  adminTest = await users.create({
    username: 'admin',
    password: 'admin',
    role: 'admin',
  });
});

afterAll(async () => {
  await db.drop();
});

describe('v2 tests', () => {
  test('create food v2', async () => {
    let response = await request.post('/api/v2/food').send({
      name: 'testing',
      calories: '75',
      type: 'fruit',
  }).set('Authorization', `Bearer ${adminTest.token}`);

    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('testing');
  });

  test('Get all test', async () => {
    let response =  await request.get('/api/v2/food').auth('admin', 'admin');

    expect(response.status).toEqual(200)
    expect(response.body[0].name).toEqual('testing');
  });

  test('Get one test', async () => {
    let response = await request.get('/api/v2/food/1').auth('admin', 'admin');

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('testing');
  });

  test('Update test', async () => {
    let response = await request.put('/api/v2/food/1').send({
      name: 'test test',
      calories: '60',
      type: 'fruit',
    }).set('Authorization', `Bearer ${adminTest.token}`);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test test');
  });

  test('Delete test', async () => {
    let response = await request.delete('/api/v2/food/1').set('Authorization', `Bearer ${adminTest.token}`);

    expect(response.status).toEqual(200);
  });
})