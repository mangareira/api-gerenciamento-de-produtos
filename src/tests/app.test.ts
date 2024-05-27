import request from 'supertest';
import { App } from '../app';

describe('App', () => {
  let appInstance: App;

  beforeAll(() => {
    appInstance = new App();
  });

  it('should respond with 404 for unknown routes', async () => {
    const response = await request(appInstance.app).get('/unknown-route');
    expect(response.status).toBe(404);
  });

  it('should have /api/product/get-all-products route', async () => {
    const response = await request(appInstance.app).get('/api/product/get-all-products');
    expect(response.status).toBe(200);
  });

  it('should create a product', async () => {
    const productData = {
      name: 'Test Product 3',
      price: 100,
      quantity: 10,
      description: 'This is a test product',
    };
    const response = await request(appInstance.app).post('/api/product/create').send(productData);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(productData.name);
  });

  it('should update a product', async () => {
    const updateData = {
      name: 'Updated Product',
      price: 150,
      quantity: 15,
      description: 'This is an updated test product',
    };
    const response = await request(appInstance.app).put('/api/product/update').query({id : "402f8adb-c20e-4297-a311-7b2cd79c5b3e"}).send(updateData);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updateData.name);
  });

  it('should delete a product', async () => {
    const response = await request(appInstance.app).delete('/api/product/delete').query({ id: "402f8adb-c20e-4297-a311-7b2cd79c5b3e" });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('product delete success');
  });
});

