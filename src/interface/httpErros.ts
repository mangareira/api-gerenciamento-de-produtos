/**
 * Classe para lidar com erros HTTP.
 * @class
 * @extends {Error}
 */
export class HttpErros extends Error {
    /**
     * @property {number} status - O status do erro HTTP. Este campo é obrigatório e deve ser um número.
     * Representa o código de status HTTP que indica o resultado da solicitação HTTP.
     */
    public status: number

    /**
     * @property {string} message - A mensagem do erro HTTP. Este campo é obrigatório e deve ser uma string.
     * Fornece detalhes adicionais sobre o erro.
     */
    public message: string

    /**
     * Construtor para a classe HttpErros.
     * Inicializa uma nova instância da classe HttpErros.
     * @constructor
     * @param {number} status - O status do erro HTTP.
     * @param {string} message - A mensagem do erro HTTP.
     */
    constructor(status: number, message: string) {
        // Chama o construtor da classe base com a mensagem do erro
        super(message)

        // Inicializa o status do erro
        this.status = status

        // Inicializa a mensagem do erro
        this.message = message
    }
}
