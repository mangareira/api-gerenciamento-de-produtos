import { ProductsUseCase } from '../useCase/productsUseCase';
import { MethodsProducts } from '../repository/methodsProducts';
import { HttpErros } from '../interface/httpErros';
import { ICreateProducts, IProducts } from '../interface';

class MockProductsRepository implements MethodsProducts {
  async create(data: ICreateProducts) { return data; }
  async update(data: IProducts) { return data; }
  async getProductById(id: string) { return { id, name: 'Test', price: 100, quantity: 1, description: 'Test Product' }; }
  async getAllProducts() { return []; }
  async deleteProduct(id: string) { return { id, name: 'Test', price: 100, quantity: 1, description: 'Test Product' }; }
  async findUnique(name: string) { return null; }
}

describe('ProductsUseCase', () => {
  let productsUseCase: ProductsUseCase;
  let mockRepository: MethodsProducts;

  beforeAll(() => {
    mockRepository = new MockProductsRepository();
    productsUseCase = new ProductsUseCase(mockRepository);
  });

  it('should create a product', async () => {
    const productData: ICreateProducts = { name: 'Test', price: 100, quantity: 1, description: 'Test Product' };
    const result = await productsUseCase.createProduct(productData);
    expect(result).toEqual(productData);
  });

  it('should throw error if product name is missing', async () => {
    const productData = { name: "",price: 100, quantity: 1, description: 'Test Product' };
    await expect(productsUseCase.createProduct(productData)).rejects.toThrow(HttpErros);
  });

  it('should update a product', async () => {
    const productData: IProducts = { id: '1', name: 'Updated Test', price: 150, quantity: 2, description: 'Updated Description' };
    const result = await productsUseCase.update(productData);
    expect(result).toEqual(productData);
  });

  it('should get a product by ID', async () => {
    const result = await productsUseCase.getProduct('1');
    expect(result).toEqual({ id: '1', name: 'Test', price: 100, quantity: 1, description: 'Test Product' });
  });

  it('should delete a product by ID', async () => {
    const result = await productsUseCase.deleteProduct('1');
    expect(result).toEqual({ id: '1', name: 'Test', price: 100, quantity: 1, description: 'Test Product' });
  });

});
