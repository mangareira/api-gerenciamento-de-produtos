/**
 * @module Controller
 * @description Classe principal do controlador.
 */

import { NextFunction, Request, Response } from "express";
import { ProductsUseCase } from "../useCase/productsUseCase";
import { ICreateProducts, IProducts } from "../interface";

export class Controller {
    
    /**
     * @constructor
     * @description Inicializa o controlador com um objeto de caso de uso de produto.
     */
    constructor(private productUseCase: ProductsUseCase) {}

    /**
     * @method create
     * @async
     * @description Cria um novo produto. Recebe os dados do produto através do corpo da requisição (req.body). 
     * Em caso de sucesso, retorna o produto criado com status 201. Em caso de erro, passa o erro para o próximo middleware.
     */
    async create(req: Request, res:Response, next: NextFunction) {
        const data: ICreateProducts = req.body
        try {
            const result = await this.productUseCase.createProduct(data)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    /**
     * @method update
     * @async
     * @description Atualiza um produto existente. Recebe o id do produto através da query da requisição (req.query) e os dados atualizados do produto através do corpo da requisição (req.body).
     * Em caso de sucesso, retorna o produto atualizado com status 200. Em caso de erro, passa o erro para o próximo middleware.
     */
    async update(req: Request, res:Response, next: NextFunction) {
        const {id} = req.query
        const updateData:IProducts = req.body
        try {
            const result = await this.productUseCase.update({...updateData, id,})
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    /**
     * @method getProduct
     * @async
     * @description Obtém um produto específico. Recebe o id do produto através da query da requisição (req.query).
     * Em caso de sucesso, retorna o produto com status 200. Em caso de erro, passa o erro para o próximo middleware.
     */
    async getProduct(req: Request, res:Response, next: NextFunction) {
        const {id}: any = req.query
        try {
            const result = await this.productUseCase.getProduct(id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    /**
     * @method getAll
     * @async
     * @description Obtém todos os produtos.
     * Em caso de sucesso, retorna todos os produtos com status 200. Em caso de erro, passa o erro para o próximo middleware.
     */
    async getAll(req: Request, res:Response, next: NextFunction) {
        try {
            const result = await this.productUseCase.getAllProducts()
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    /**
     * @method deleteProduct
     * @async
     * @description Deleta um produto específico. Recebe o id do produto através da query da requisição (req.query).
     * Em caso de sucesso, retorna uma mensagem de sucesso e o id do produto deletado com status 200. Em caso de erro, passa o erro para o próximo middleware.
     */
    async deleteProduct(req: Request, res:Response, next: NextFunction) {
        const {id}: any = req.query
        try {
            await this.productUseCase.deleteProduct(id)
            res.status(200).json({message: "product delete success", productId: id})
        } catch (error) {
            next(error)
        }
    }
}
