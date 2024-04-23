const express = require('express');
const request = require('supertest');
const carRouter = require('../routes/carsRouter');

const app = express();

app.use(express.json());
app.use('/api/v1/cars', carRouter);

describe('Integration tests for car_warehouse', () => {
  it('GET /api/v1/cars - Success - get all cars', async () => {
    const { body, statusCode } = await request(app).get('/api/v1/cars');
    expect(statusCode).toBe(200);

    expect(body.status).toBe('success');

    expect(body.length).toBeGreaterThanOrEqual(0);

    expect(body.cars).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          model: expect.any(String),
          color: expect.any(String),
          quantity: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      ])
    );
  });

  it('POST /api/v1/cars - Invaild Model (Empty) - create new car', async () => {
    const { body, statusCode } = await request(app).post('/api/v1/cars').send({
      model: '',
      color: 'RED',
      quantity: 3,
    });

    expect(statusCode).toBe(400);
    expect(body.status).toBe('error');
    expect(body.msg).toBe('Input validation error');
    expect(body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'field',
          value: '',
          msg: 'Car model is required',
          path: 'model',
          location: 'body',
        }),
      ])
    );
  });

  it('POST /api/v1/cars - Invaild Color (Empty) - create new car', async () => {
    const { body, statusCode } = await request(app).post('/api/v1/cars').send({
      model: 'TEST MODEL 4',
      color: '',
      quantity: 3,
    });

    expect(statusCode).toBe(400);
    expect(body.status).toBe('error');
    expect(body.msg).toBe('Input validation error');
    expect(body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'field',
          value: '',
          msg: 'Car color is required',
          path: 'color',
          location: 'body',
        }),
      ])
    );
  });

  it('POST /api/v1/cars - Invaild Quantity (Empty) - create new car', async () => {
    const { body, statusCode } = await request(app).post('/api/v1/cars').send({
      model: 'TEST MODEL 4',
      color: 'BLUE',
    });

    expect(statusCode).toBe(400);
    expect(body.status).toBe('error');
    expect(body.msg).toBe('Input validation error');
    expect(body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: 'field',
            msg: 'Car quantity is required',
            path: 'quantity',
            location: 'body',
          },
          {
            type: 'field',
            msg: 'Quantity must be a positive integer',
            path: 'quantity',
            location: 'body',
          }
        ),
      ])
    );
  });

  it('POST /api/v1/cars - Invaild Quantity (Less than 1) - create new car', async () => {
    const { body, statusCode } = await request(app).post('/api/v1/cars').send({
      model: 'TEST MODEL 4',
      color: 'BLUE',
      quantity: 0,
    });

    expect(statusCode).toBe(400);
    expect(body.status).toBe('error');
    expect(body.msg).toBe('Input validation error');
    expect(body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'field',
          msg: 'Quantity must be a positive integer',
          path: 'quantity',
          location: 'body',
        }),
      ])
    );
  });

  it('POST /api/v1/cars - Create new car - success', async () => {
    const { body, statusCode } = await request(app).post('/api/v1/cars').send({
      model: 'Success TEST',
      color: 'BLUE',
      quantity: 5,
    });

    expect(statusCode).toBe(201);
    expect(body.status).toBe('success');
    expect(body.newCar).toBeDefined();
    expect(body.newCar).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        model: 'Success TEST',
        color: 'BLUE',
        quantity: 5,
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
      })
    );
    expect(new Date(body.newCar.updatedAt)).toBeInstanceOf(Date);
    expect(new Date(body.newCar.createdAt)).toBeInstanceOf(Date);
  });
});
