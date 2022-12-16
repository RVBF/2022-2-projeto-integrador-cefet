export class FuncionarioError extends Error {
    constructor(message: string) {
        super(`${message}`);
        this.name = 'FuncionarioError';
    }
}
