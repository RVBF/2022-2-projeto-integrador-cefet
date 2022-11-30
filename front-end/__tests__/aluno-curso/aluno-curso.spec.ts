import { AlunoCurso } from '../../app/src/aluno-curso/aluno-curso';

describe('Relizar os testes das Notas', () => {
    describe('Validar retorno de resultado baseado em notas', () => {
        it('Deve retornar {Aprovado} quando a media de avaliações for maior ou igual a 7', () => {
            const nota = new AlunoCurso({
                id: 1,
                matricula: 123456,
                notaAv1: 7,
                notaAv2: 7,
                notaAF: 0,
                falta: 1,
                aluno: null
            });
            expect(nota.situacaoAluno()).toBe('Aprovado');
        })

        it('Deve retornar {Aprovado} quando a media final for maior ou igual a 5', () => {
            const nota = new AlunoCurso({
                id: 1,
                matricula: 123456,
                notaAv1: 3,
                notaAv2: 3,
                notaAF: 7,
                falta: 1,
                aluno: null
            });
            expect(nota.situacaoFinalAluno()).toBe('Aprovado');
        })

        it('Deve retornar {Avaliação Final} quando média de avalições for entre 3 e 6.9', function () {
            const nota = new AlunoCurso({
                id: 1,
                matricula: 123456,
                notaAv1: 7,
                notaAv2: 6,
                notaAF: 0,
                falta: 1,
                aluno: null
            });
            expect(nota.situacaoAluno()).toBe('Avaliação Final');
        });

        it('Deve retornar {Reprovado} quando média de avalições for menor que 3', function () {
            const nota = new AlunoCurso({
                id: 1,
                matricula: 123456,
                notaAv1: 3,
                notaAv2: 2.9,
                notaAF: 0,
                falta: 1,
                aluno: null
            });
            expect(nota.situacaoAluno()).toBe('Reprovado');
        });

        it('Deve retornar {Reprovado} quando média final for menor que 5', function () {
            const nota = new AlunoCurso({
                id: 1,
                matricula: 123456,
                notaAv1: 7,
                notaAv2: 6,
                notaAF: 3.4,
                falta: 1,
                aluno: null
            });
            expect(nota.situacaoFinalAluno()).toBe('Reprovado');
        });
    })
});
