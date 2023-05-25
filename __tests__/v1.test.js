'use strict';

const { server } = require('../src/server');
const { db, users } = require('../src/models/index');
const supertest = require('supertest');

const request = supertest(server);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe('Routing tests', () => {
  test('create food', async () => {
    let response = await request.post('/api/v1/food').send({
      name: 'test',
      calories: '75',
      type: 'orange',
  });

    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('test');
  });

  test('Get all test', async () => {
    let response = await request.get('/api/v1/food')

    expect(response.status).toEqual(200)
    expect(response.body[0].name).toEqual('test');
  });

  test('Get one test', async () => {
    let response = await request.get('/api/v1/food/1')

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
  });

  test('Update test', async () => {
    let response = await request.put('/api/v1/food/1').send({
      name: 'test test',
      calories: '60',
      type: 'fruit',
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test test');
  });

  test('Delete test', async () => {
    let response = await request.delete('/api/v1/food/1');

    expect(response.status).toEqual(200);
  });

});