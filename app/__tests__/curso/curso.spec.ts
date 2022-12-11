import { Curso } from '../../src/curso/curso'

describe('Relizar os testes dos atributos de Cursos', () => {
    it('Não deve retornar erros quando os atributos estiverem corretos', () => {
        const curso = new Curso({
            id: 1,
            codigo: 'PHP01',
            nome: 'Curso de PHP',
            situacao: 'iniciado',
            inicio: new Date( '2022-01-01 00:00:00' ),
            termino: new Date( '2023-12-31 00:00:00' )
        });
        expect(curso.validar()).toHaveLength(0);
    })

    it('Deve retornar código invalido', () => {
        const curso = new Curso({
            id: 1,
            codigo: 'PHP1',
            nome: 'Curso de PHP',
            situacao: 'iniciado',
            inicio: new Date( '2022-01-01 00:00:00' ),
            termino: new Date( '2023-12-31 00:00:00' )
        });
        expect(curso.validar()).toEqual(['Código inválido']);
    })

    it('Deve retornar nome inválido caso tenha menos de 2 caracteres.', () => {
        const curso = new Curso({
            id: 1,
            codigo: 'PHP01',
            nome: 'P',
            situacao: 'iniciado',
            inicio: new Date( '2022-01-01 00:00:00' ),
            termino: new Date( '2023-12-31 00:00:00' )
        });
        expect(curso.validar()).toEqual(['Nome inválido']);
    })

    it('Deve retornar nome inválido caso tenha mais de 100 caracteres.', () => {
        const curso = new Curso({
            id: 1,
            codigo: 'PHP01',
            nome: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys stasa',
            situacao: 'iniciado',
            inicio: new Date( '2022-01-01 00:00:00' ),
            termino: new Date( '2023-12-31 00:00:00' )
        });
        expect(curso.validar()).toEqual(['Nome inválido']);
    })

    it('Deve retornar situação inválida para valores foram dos definidos', () => {
        const curso = new Curso({
            id: 1,
            codigo: 'PHP01',
            nome: 'Curso de PHP',
            situacao: 'terminado',
            inicio: new Date( '2022-01-01 00:00:00' ),
            termino: new Date( '2023-12-31 00:00:00' )
        });
        expect(curso.validar()).toEqual(['Situação inválida']);
    })

    it('Deve retornar erro se o início for maior que o término', () => {
        const curso = new Curso({
            id: 1,
            codigo: 'PHP01',
            nome: 'Curso de PHP',
            situacao: 'iniciado',
            inicio: new Date( '2024-01-01 00:00:00' ),
            termino: new Date( '2023-12-31 00:00:00' )
        });
        expect(curso.validar()).toEqual(['Término deve ser maior que o início']);
    })
});
