import { httpErrorMiddleware } from '../middlewares/erroMiddleware';
import { Request, Response, NextFunction } from 'express';
import { HttpErros } from '../interface/httpErros';

describe('httpErrorMiddleware', () => {
  it('should return the correct error response', () => {
    const err = new HttpErros(400, 'Test Error');
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    httpErrorMiddleware(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ status: 400, message: 'Test Error' });
  });
});
