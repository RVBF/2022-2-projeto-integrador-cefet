import { AlunoCurso } from '../../src/aluno-curso/aluno-curso';

describe('Realizar os testes das Notas', () => {
    describe('Validar retorno de resultado baseado em notas', () => {
        it('Deve retornar {Aprovado} quando a media de avaliações for maior ou igual a 7', () => {
            const nota = new AlunoCurso({
                id: 1,
                matricula: 123456,
                av1: 7,
                av2: 7,
                notaAF: 0,
                faltas: 1,
                aluno: null,
                curso: null
            });
            expect(nota.situacaoAluno()).toBe('Aprovado');
        })

        it('Deve retornar {Aprovado} quando a media final for maior ou igual a 5', () => {
            const nota = new AlunoCurso({
                id: 1,
                matricula: 123456,
                av1: 3,
                av2: 3,
                notaAF: 7,
                faltas: 1,
                aluno: null,
                curso: null
            });
            expect(nota.situacaoFinalAluno()).toBe('Aprovado');
        })

        it('Deve retornar {Avaliação Final} quando média de avalições for entre 3 e 6.9', function () {
            const nota = new AlunoCurso({
                id: 1,
                matricula: 123456,
                av1: 7,
                av2: 6,
                notaAF: 0,
                faltas: 1,
                aluno: null,
                curso: null
            });
            expect(nota.situacaoAluno()).toBe('Avaliação Final');
        });

        it('Deve retornar {Reprovado} quando média de avalições for menor que 3', function () {
            const nota = new AlunoCurso({
                id: 1,
                matricula: 123456,
                av1: 3,
                av2: 2.9,
                notaAF: 0,
                faltas: 1,
                aluno: null,
                curso: null
            });
            expect(nota.situacaoAluno()).toBe('Reprovado');
        });

        it('Deve retornar {Reprovado} quando média final for menor que 5', function () {
            const nota = new AlunoCurso({
                id: 1,
                matricula: 123456,
                av1: 7,
                av2: 6,
                notaAF: 3.4,
                faltas: 1,
                aluno: null,
                curso: null
            });
            expect(nota.situacaoFinalAluno()).toBe('Reprovado');
        });
    })
});
