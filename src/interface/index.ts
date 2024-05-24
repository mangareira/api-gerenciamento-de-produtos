/**
 * Interface para a criação de produtos.
 * @interface
 */
export interface ICreateProducts {
    /**
     * @property {string} name - O nome do produto. Este campo é obrigatório e deve ser uma string.
     */
    name: string

    /**
     * @property {string | null} description - A descrição do produto. Este campo é opcional e pode ser uma string ou nulo. 
     * Se fornecido, oferece uma descrição detalhada do produto.
     */
    description?: string | null 

    /**
     * @property {number} price - O preço do produto. Este campo é obrigatório e deve ser um número. 
     * Representa o custo do produto em uma unidade monetária específica.
     */
    price: number

    /**
     * @property {number} quantity - A quantidade do produto em estoque. Este campo é obrigatório e deve ser um número. 
     * Representa a quantidade disponível do produto em estoque.
     */
    quantity: number
}

/**
 * Tipo para os produtos.
 * @typedef {object} IProducts
 */
export type IProducts = {
    /**
     * @property {string | any} id - O ID do produto. Este campo é opcional e pode ser uma string ou qualquer outro tipo. 
     * Se fornecido, representa o identificador único do produto no banco de dados.
     */
    id?: string | any

    /**
     * @property {string} name - O nome do produto. Este campo é obrigatório e deve ser uma string. 
     * Representa o nome pelo qual o produto é conhecido.
     */
    name: string

    /**
     * @property {string | null} description - A descrição do produto. Este campo é opcional e pode ser uma string ou nulo. 
     * Se fornecido, oferece uma descrição detalhada do produto.
     */
    description?: string | null 

    /**
     * @property {number} price - O preço do produto. Este campo é obrigatório e deve ser um número. 
     * Representa o custo do produto em uma unidade monetária específica.
     */
    price: number

    /**
     * @property {number} quantity - A quantidade do produto em estoque. Este campo é obrigatório e deve ser um número. 
     * Representa a quantidade disponível do produto em estoque.
     */
    quantity: number
}
