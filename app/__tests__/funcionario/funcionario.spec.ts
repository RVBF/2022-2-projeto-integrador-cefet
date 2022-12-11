import { Funcionario } from '../../src/funcionario/funcionario';

describe('Aluno', () => {
  describe('Validar dados de aluno', () => {
    it('não deve retornar nenhum erro, quando todos os atributos estiverem corretos', () => {
      const funcionario = new Funcionario({
        id: '1',
        nome: 'Vitor',
        cpf: '18084247786',
        email: 'vitorhugo.rangel@yahoo.com.br',
      });
      expect(funcionario.validateAll()).toHaveLength(0);
    });

    it('deve retornar nome inválido, quando o nome tiver menos de 2 caracteres', () => {
      const funcionario = new Funcionario({
        id: '1',
        nome: 'V',
        cpf: '18084247786',
        email: 'vitorhugo.rangel@yahoo.com.br',
      });
      expect(funcionario.validateAll()).toEqual(['Nome inválido']);
    });

    it('deve retornar nome inválido, quando o nome tiver mais de 100 caracteres', () => {
      const funcionario = new Funcionario({
        id: '1',
        nome: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys stasa',
        cpf: '18084247786',
        email: 'vitorhugo.rangel@yahoo.com.br',
      });
      expect(funcionario.validateAll()).toEqual(['Nome inválido']);
    });

    it('deve retornar cpf inválido, quando for inserido um cpf inválido', () => {
      const funcionario = new Funcionario({
        id: '1',
        nome: 'Vitor',
        cpf: '18084247787',
        email: 'vitorhugo.rangel@yahoo.com.br',
      });
      expect(funcionario.validateAll()).toEqual(['CPF inválido']);
    });

    it('deve retornar email inválido, quando o email for inválido', () => {
      const funcionario = new Funcionario({
        id: '1',
        nome: 'Vitor',
        cpf: '18084247786',
        email: 'vitorhugo.rangel#yahoo.com.br',
      });
      expect(funcionario.validateAll()).toEqual(['Email inválido']);
    });
  });
});
