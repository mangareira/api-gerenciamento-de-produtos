/**
 * @module ProductsUseCase
 * @description Classe principal do caso de uso de produtos.
 */

import { ICreateProducts, IProducts } from "../interface";
import { HttpErros } from "../interface/httpErros";
import { MethodsProducts } from "../repository/methodsProducts";

export class ProductsUseCase {

    /**
     * @constructor
     * @description Inicializa o caso de uso de produtos com um objeto de repositório de produtos.
     * @param {MethodsProducts} productsRepository - O repositório de produtos que será usado para operações de banco de dados.
     */
    constructor(private productsRepository: MethodsProducts) {}

    /**
     * @method createProduct
     * @async
     * @description Cria um novo produto. Recebe os dados do produto através do parâmetro 'data'. 
     * Em caso de sucesso, retorna o produto criado. Em caso de erro, lança um erro HTTP.
     * @param {ICreateProducts} data - Os dados do produto a ser criado.
     * @returns {Promise<ICreateProducts>} O produto criado.
     * @throws {HttpErros} Se algum dos campos obrigatórios estiver faltando ou se o campo 'description' tiver mais de 500 caracteres.
     */
    async createProduct(data: ICreateProducts): Promise<ICreateProducts> {
        if(!data.name) throw new HttpErros(400, "Name is required")
        if(!data.price || data.price < 0) throw new HttpErros(400, "Price is required or must have a positive value")
        if(!data.quantity || data.quantity < 0) throw new HttpErros(400, "Quantity is required or must have a positive value")
        if((data.description?.length ?? 0) >= 500) throw new HttpErros(400, "Limit of caracter is 500")
        const create = await this.productsRepository.create(data)
        return create
    }

    /**
     * @method update
     * @async
     * @description Atualiza um produto existente. Recebe os dados atualizados do produto através do parâmetro 'data'.
     * Em caso de sucesso, retorna o produto atualizado. Em caso de erro, lança um erro HTTP.
     * @param {IProducts} data - Os dados atualizados do produto.
     * @returns {Promise<IProducts>} O produto atualizado.
     * @throws {HttpErros} Se o campo 'id' estiver faltando, se o campo 'name' estiver vazio, se o campo 'price' ou 'quantity' for menor que 0, ou se o campo 'description' tiver mais de 500 caracteres.
     */
    async update(data: IProducts): Promise<IProducts | undefined> {
        if(!data.id) throw new HttpErros(400, "Id is required")
        if(data.name == "") throw new HttpErros(400, "The name field must have a value")    
        if(data.price < 0) throw new HttpErros(400, "the price field must be greater than 0 or equal tha 0")    
        if(data.quantity < 0) throw new HttpErros(400, "the quantity field must be greater than 0 or equal tha 0")
        if((data.description?.length ?? 0) >= 500) throw new HttpErros(400, "Limit of caracter is 500")
        const isExists = await this.productsRepository.getProductById(data.id)
        if(isExists) {
            const update = await this.productsRepository.update(data)
            return update
        } 
    }

    /**
     * @method getProduct
     * @async
     * @description Obtém um produto específico. Recebe o id do produto através do parâmetro 'id'.
     * Em caso de sucesso, retorna o produto. Em caso de erro, lança um erro HTTP.
     * @param {string} id - O id do produto a ser obtido.
     * @returns {Promise<IProducts>} O produto obtido.
     * @throws {HttpErros} Se o campo 'id' estiver faltando.
     */
    async getProduct(id: string): Promise<IProducts>{
        if(!id) throw new HttpErros(400, "Id is required")
        const getProduct = await this.productsRepository.getProductById(id)
        return getProduct
    }

    /**
     * @method getAllProducts
     * @async
     * @description Obtém todos os produtos.
     * Em caso de sucesso, retorna todos os produtos. Em caso de erro, lança um erro HTTP.
     * @returns {Promise<Array<IProducts>>} Todos os produtos.
     */
    async getAllProducts(): Promise<Array<IProducts>> {
        const getAllProducts = await this.productsRepository.getAllProducts()
        return getAllProducts
    }

    /**
     * @method deleteProduct
     * @async
     * @description Deleta um produto específico. Recebe o id do produto através do parâmetro 'id'.
     * Em caso de sucesso, retorna uma mensagem de sucesso. Em caso de erro, lança um erro HTTP.
     * @param {string} id - O id do produto a ser deletado.
     * @returns {Promise<string>} Uma mensagem de sucesso.
     * @throws {HttpErros} Se o campo 'id' estiver faltando.
     */
    async deleteProduct(id: string): Promise<IProducts | undefined> {
        if(!id) throw new HttpErros(400, "Id is required")
        const isExists = await this.productsRepository.getProductById(id)
        if(isExists) {
            const deleteProduct = await this.productsRepository.deleteProduct(id)
            return deleteProduct
        }
    }
}
