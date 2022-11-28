import { Nota } from '../../app/src/nota/nota';

describe ('Notas', () => {
    describe('Validar retorno de resultado baseado em notas', () => {
        it ('Deve retornar aprovado, quando a media de avaliações for maior ou igual a 7', () =>{
            const nota = new Nota({
                av1: 7,
                av2: 7,
                mediaDeAvaliacoes: 0,
                avaliaçãoFinal: 0,
                mediaFinal: 0,
            });
            expect(nota.calculateMediaDeAvaliacoes(7, 7)).toBe('Aprovado');
        })

        it ('Deve retornar aprovado, quando a media final for maior ou igual a 5', () =>{
            const nota = new Nota({
                av1: 7,
                av2: 7,
                mediaDeAvaliacoes: 0,
                avaliaçãoFinal: 0,
                mediaFinal: 0,
            });
            expect(nota.calculateMediaFinal(3, 3, 7)).toBe('Aprovado');
        })

        it ('Deve retornar avaliação final, quando a media de avaliações for maior ou igual a 3 e menor que 7', () =>{
            const nota = new Nota({
                av1: 7,
                av2: 7,
                mediaDeAvaliacoes: 0,
                avaliaçãoFinal: 0,
                mediaFinal: 0,
            });
            expect(nota.calculateMediaDeAvaliacoes(7, 6.9)).toBe('Avaliação Final');
        })

        it ('Deve retornar reprovado, quando a media de avaliações for menor que 3', () =>{
            const nota = new Nota({
                av1: 7,
                av2: 7,
                mediaDeAvaliacoes: 0,
                avaliaçãoFinal: 0,
                mediaFinal: 0,
            });
            expect(nota.calculateMediaDeAvaliacoes(3, 2.9)).toBe('Reprovado');
        })

        it ('Deve retornar reprovado, quando a media final for menor que 5', () =>{
            const nota = new Nota({
                av1: 7,
                av2: 7,
                mediaDeAvaliacoes: 0,
                avaliaçãoFinal: 0,
                mediaFinal: 0,
            });
            expect(nota.calculateMediaFinal(3, 3, 6.9)).toBe('Reprovado');
        })
    })
})