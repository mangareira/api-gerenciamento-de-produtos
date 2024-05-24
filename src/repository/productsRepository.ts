/**
 * @module interface
 */
import { ICreateProducts, IProducts } from "../interface";

/**
 * @module prisma.service
 */
import { prisma } from "../service/prisma.service";

/**
 * @module methodsProducts
 */
import { MethodsProducts } from "./methodsProducts";

/**
 * Classe para lidar com as operações do repositório de produtos.
 * @class
 * @implements {MethodsProducts}
 */
export class ProductsRepository implements MethodsProducts {
    /**
     * Método para criar um novo produto.
     * @method
     * @param {ICreateProducts} data - Os dados do produto a ser criado.
     * @returns {Promise<ICreateProducts>} Uma promessa que resolve para o produto criado.
     */
    async create(data: ICreateProducts): Promise<ICreateProducts> {
        const result = await prisma.products.create({
            data,
            select: {
                name: true,
                description: true,
                price: true,
                quantity: true
            }
        })
        return result 
    }

    /**
     * Método para atualizar um produto existente.
     * @method
     * @param {IProducts} data - Os dados atualizados do produto.
     * @returns {Promise<IProducts>} Uma promessa que resolve para o produto atualizado.
     */
    async update(data: IProducts): Promise<IProducts> {
        const result = await prisma.products.update({
            where: {
                id: data.id
            },
            data,
            select: {
                id: false,
                name: true,
                description: true,
                price: true,
                quantity: true
            }
        })
        return result
    }

    /**
     * Método para recuperar um produto pelo ID.
     * @method
     * @param {string} id - O ID do produto a ser recuperado.
     * @returns {Promise<IProducts>} Uma promessa que resolve para o produto recuperado.
     */
    async getProductById(id: string): Promise<IProducts> {
        const result = await prisma.products.findFirstOrThrow({
            where: {
                id,
            }
        })
        return result
    }

    /**
     * Método para recuperar todos os produtos.
     * @method
     * @returns {Promise<IProducts[]>} Uma promessa que resolve para uma lista de todos os produtos.
     */
    async getAllProducts(): Promise<IProducts[]> {
        const result = await prisma.products.findMany()
        return result
    }

    /**
     * Método para excluir um produto.
     * @method
     * @param {string} id - O ID do produto a ser excluído.
     * @returns {Promise<IProducts>} Uma promessa que resolve para o produto excluído.
     */
    async deleteProduct(id: string){
        const result = await prisma.products.delete({
            where:{
                id,
            }
        })
        return result
    }
}
