export class AlunoError extends Error {
    constructor(message: string) {
        super(`${message}`);
        this.name = 'AlunoError';
    }
}
