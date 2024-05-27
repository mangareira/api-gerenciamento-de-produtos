import { Request, Response, NextFunction, response } from 'express';
import { Controller } from '../controller';
import { ProductsUseCase } from '../useCase/productsUseCase';
import { ICreateProducts, IProducts } from '../interface';

class MockProductsUseCase {
  async createProduct(data: ICreateProducts) { return data; }
  async update(data: IProducts) { return data; }
  async getProduct(id: string) { return { id, name: 'Test', price: 100, quantity: 1, description: 'Test Product' }; }
  async getAllProducts() { return [{ id: '1', name: 'Test', price: 100, quantity: 1, description: 'Test Product' }]; }
  async deleteProduct(id: string) { return { id, name: 'Test', price: 100, quantity: 1, description: 'Test Product' }; }
}

describe('Controller', () => {
  let controller: Controller;
  let mockProductsUseCase: MockProductsUseCase;

  beforeAll(() => {
    mockProductsUseCase = new MockProductsUseCase();
    controller = new Controller(mockProductsUseCase as unknown as ProductsUseCase);
  });

  it('should create a product', async () => {
    const req = {
      body: { name: 'Test', price: 100, quantity: 1, description: 'Test Product' }
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    await controller.create(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it('should get a product by ID', async () => {
    const req = { query: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    await controller.getProduct(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: '1', name: 'Test', price: 100, quantity: 1, description: 'Test Product' });
  });

  it('should get all products', async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    await controller.getAll(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: '1', name: 'Test', price: 100, quantity: 1, description: 'Test Product' }]);
  });

  it('should delete a product by ID', async () => {
    const req = { query: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    await controller.deleteProduct(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'product delete success', productId: '1' });
  });
});
