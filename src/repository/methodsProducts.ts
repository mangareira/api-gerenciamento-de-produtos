/**
 * @module interface
 */
import { ICreateProducts, IProducts } from "../interface";

/**
 * Interface para os métodos do produto.
 * @interface
 */
export interface MethodsProducts {
    /**
     * Método para criar um novo produto.
     * @method
     * @param {ICreateProducts} data - Os dados do produto a ser criado.
     * @returns {Promise<ICreateProducts>} Uma promessa que resolve para o produto criado.
     */
    create(data: ICreateProducts): Promise<ICreateProducts>

    /**
     * Método para atualizar um produto existente.
     * @method
     * @param {IProducts} data - Os dados atualizados do produto.
     * @returns {Promise<IProducts>} Uma promessa que resolve para o produto atualizado.
     */
    update(data: IProducts): Promise<IProducts>

    /**
     * Método para recuperar um produto pelo ID.
     * @method
     * @param {string} id - O ID do produto a ser recuperado.
     * @returns {Promise<IProducts>} Uma promessa que resolve para o produto recuperado.
     */
    getProductById(id: string): Promise<IProducts>

    /**
     * Método para recuperar todos os produtos.
     * @method
     * @returns {Promise<IProducts[]>} Uma promessa que resolve para uma lista de todos os produtos.
     */
    getAllProducts(): Promise<IProducts[]>

    /**
     * Método para excluir um produto.
     * @method
     * @param {string} id - O ID do produto a ser excluído.
     * @returns {Promise<IProducts>} Uma promessa que resolve para o produto excluído.
     */
    deleteProduct(id: string): Promise<IProducts>
}
