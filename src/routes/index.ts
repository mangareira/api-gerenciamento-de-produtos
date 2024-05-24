/**
 * @module express
 */
import { Router } from "express";

/**
 * @module controller
 */
import { Controller } from "../controller";

/**
 * @module productsUseCase
 */
import { ProductsUseCase } from "../useCase/productsUseCase";

/**
 * @module productsRepository
 */
import { ProductsRepository } from "../repository/productsRepository";

/**
 * Classe para lidar com as rotas do produto.
 * @class
 */
export class Routes {
    /**
     * @property {Router} router - O roteador do Express.js.
     */
    public router: Router

    /**
     * @property {Controller} controller - O controlador para lidar com as solicitações e respostas.
     */
    private controller: Controller

    /**
     * Construtor para a classe Routes.
     * Inicializa o roteador e define as rotas do produto.
     * @constructor
     */
    constructor() {
        // Inicializa o roteador
        this.router = Router()

        // Cria uma nova instância do ProductsRepository
        const productsRepository = new ProductsRepository()

        // Cria uma nova instância do ProductsUseCase com a instância do ProductsRepository
        const productsUseCase = new ProductsUseCase(productsRepository)

        // Cria uma nova instância do Controller com a instância do ProductsUseCase
        this.controller = new Controller(productsUseCase)

        // Define as rotas do produto
        this.product()
    }

    /**
     * Método para definir as rotas do produto.
     * Define as rotas específicas para criar, atualizar, recuperar e excluir produtos.
     */
    product() {
        // Rota POST para criar um novo produto
        this.router.post("/product/create", this.controller.create.bind(this.controller))

        // Rota PUT para atualizar um produto existente
        this.router.put("/product/update", this.controller.update.bind(this.controller))

        // Rota GET para recuperar um único produto
        this.router.get("/product/get-product", this.controller.getProduct.bind(this.controller))

        // Rota GET para recuperar todos os produtos
        this.router.get("/product/get-all-products", this.controller.getAll.bind(this.controller))

        // Rota DELETE para excluir um produto
        this.router.delete("/product/delete", this.controller.deleteProduct.bind(this.controller))
    }
}
