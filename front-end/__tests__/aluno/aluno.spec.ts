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
      expect(aluno.validateAll()).toHaveLength(0);
    });

    // it('deve retornar matrícula inválida, quando a matrícula tiver menos que 6 dígitos.', () => {
    //   const aluno = new Aluno({
    //     matricula: 12345,
    //     nome: 'Vitor',
    //     cpf: '18084247786',
    //     telefone: '21972072032',
    //     email: 'vitorhugo.rangel@yahoo.com.br',
    //   });
    //   expect(aluno.validateAll()).toContain(['Matrícula inválida']);
    // });

    // it('deve retornar nome inválido, quando o nome tiver menos de 2 caracteres', () => {
    //   const aluno = new Aluno({
    //     matricula: 123456,
    //     nome: 'Vitor',
    //     cpf: '18084247786',
    //     telefone: '21972072032',
    //     email: 'vitorhugo.rangel@yahoo.com.br',
    //   });
    //   expect(aluno.validateAll()).toContain(['Nome inválido']);
    // });

    // it('deve retornar nome inválido, quando o nome tiver mais de 100 caracteres', () => {
    //   const aluno = new Aluno({
    //     matricula: 123456,
    //     nome: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys st',
    //     cpf: '18084247786',
    //     telefone: '21972072032',
    //     email: 'vitorhugo.rangel@yahoo.com.br',
    //   });
    //   expect(aluno.validateAll()).toContain(['Nome inválido']);
    // });

    // it('deve retornar cpf inválido, quando for inserido um cpf inválido', () => {
    //   const aluno = new Aluno({
    //     matricula: 123456,
    //     nome: 'Vitor',
    //     cpf: '18084247787',
    //     telefone: '21972072032',
    //     email: 'vitorhugo.rangel@yahoo.com.br',
    //   });
    //   expect(aluno.validateAll()).toContain(['CPF inválido']);
    // });

    // it('deve retornar telefone inválido, quando o telefone for inválido', () => {
    //   const aluno = new Aluno({
    //     matricula: 123456,
    //     nome: 'Vitor',
    //     cpf: '18084247786',
    //     telefone: '2197207203',
    //     email: 'vitorhugo.rangel@yahoo.com.br',
    //   });
    //   expect(aluno.validateAll()).toContain(['Telefone inválido']);
    // });

    // it('deve retornar email inválido, quando o email for inválido', () => {
    //   const aluno = new Aluno({
    //     matricula: 12345,
    //     nome: 'Vitor',
    //     cpf: '18084247786',
    //     telefone: '21972072032',
    //     email: 'vitorhugo.rangel#yahoo.com.br',
    //   });
    //   expect(aluno.validateAll()).toContain(['Email inválido']);
    // });
  });
});
