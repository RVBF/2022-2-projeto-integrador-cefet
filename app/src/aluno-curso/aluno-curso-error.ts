export class AlunoCursoError extends Error {
    constructor(message: string) {
        super(`${message}`);
        this.name = 'NotasError';
    }
}
