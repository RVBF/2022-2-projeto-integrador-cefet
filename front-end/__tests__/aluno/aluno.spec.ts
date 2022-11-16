import { Aluno } from '../../app/src/aluno/aluno';

describe('Aluno', () => {
  describe('Validar dados de aluno', () => {
    it('não deve retornar nenhum erro, quando todos os atributos estiverem corretos', () => {
      const aluno = new Aluno({
        matricula: 123456,
        nome: 'Vitor',
        cpf: '18084247786',
        telefone: '21972072032',
        email: 'vitorhugo.rangel@yahoo.com.br',
      });
      expect(aluno.validateAll([]).toBe();;
    });
  });
});
