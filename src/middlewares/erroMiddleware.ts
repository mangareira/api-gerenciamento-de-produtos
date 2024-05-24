/**
 * @module express
 */
import { NextFunction, Request, Response } from "express";

/**
 * @module httpErros
 */
import { HttpErros } from "../interface/httpErros";

/**
 * Middleware para lidar com erros HTTP.
 * @function
 * @param {HttpErros} err - O objeto de erro HTTP.
 * @param {Request} req - O objeto de solicitação do Express.js.
 * @param {Response} res - O objeto de resposta do Express.js.
 * @param {NextFunction} next - A função next do Express.js.
 */
export function httpErrorMiddleware(err: HttpErros, req: Request, res: Response, next: NextFunction) {
    // O status do erro, padrão é 500
    const status: number = err.status ?? 500

    // A mensagem do erro, padrão é "Internal error server"
    const message: string = err.message ?? "Internal error server"

    // Envia a resposta com o status e a mensagem do erro
    res.status(status).json(message) 
}
