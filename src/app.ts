/**
 * @module App
 * @description Classe principal da aplicação.
 */

import express, { Application } from "express";
import cors from 'cors'
import { Routes } from "./routes";
import { httpErrorMiddleware } from "./middlewares/erroMiddleware";

export class App {
    public app: Application
    private routes = new Routes()

    /**
     * @constructor
     * @description Inicializa a aplicação Express, inicializa os middlewares, define as rotas e configura o tratamento de erros.
     */
    constructor() {
        this.app = express() // Inicializa a aplicação Express.
        this.middlewareInitializer() // Chama o método para inicializar os middlewares.
        this.route() // Chama o método para definir as rotas da aplicação.
        this.errors() // Chama o método para configurar o middleware de tratamento de erros.
    }

    /**
     * @method route
     * @private
     * @description Define as rotas da aplicação. As rotas são definidas no objeto 'routes' e são usadas na rota '/api'.
     */
    private route() {
        this.app.use('/api', this.routes.router)
    }

    /**
     * @method errors
     * @private
     * @description Configura o middleware de tratamento de erros. Este middleware é usado para lidar com erros que ocorrem durante o processamento das requisições.
     */
    private errors() {
        this.app.use(httpErrorMiddleware)
    }

    /**
     * @method middlewareInitializer
     * @private
     * @description Inicializa os middlewares da aplicação. Os middlewares incluem o middleware para analisar o corpo da requisição como JSON, o middleware CORS para permitir requisições de diferentes origens e o middleware para analisar o corpo da requisição como dados codificados em URL.
     */
    private middlewareInitializer() {
        this.app.use(express.json()) // Analisa o corpo da requisição como JSON.
        this.app.use(cors()) // Permite requisições de diferentes origens.
        this.app.use(express.urlencoded({extended: true})) // Analisa o corpo da requisição como dados codificados em URL.
    }

    /**
     * @method listen
     * @public
     * @description Inicia o servidor na porta 3333. Quando o servidor é iniciado, uma mensagem é exibida no console indicando que o servidor está em execução.
     */
    listen() {
        this.app.listen(3333, () => console.log("server is running"))
    }
}
