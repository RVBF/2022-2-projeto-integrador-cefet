interface AlunoDTO {
  id: number;
  matricula: number;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
}

export class Aluno {
  id: number = 0;
  matricula: number = 0;
  nome: string = '';
  cpf: string = '';
  telefone: string = '';
  email: string = '';

  constructor({ id, matricula, nome, cpf, telefone, email }: AlunoDTO) {
    this.id = id;
    this.matricula = matricula;
    this.nome = nome;
    this.cpf = cpf;
    this.telefone = telefone;
    this.email = email;
  }

  validateAll = (): String[] => {
    const arrayErrors: string[] = [];

    if (this.matricula == null || isNaN(this.matricula) || this.matricula.toString().length < 6) {
      arrayErrors.push('Matrícula inválida');
    }

    if (this.nome === '' || this.nome.length < 2 || this.nome.length > 100) {
      arrayErrors.push('Nome inválido');
    }

    if (this.validateCPF(this.cpf) === false) {
      arrayErrors.push('CPF inválido');
    }

    if (!/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/.test( this.telefone )
    ) {
      arrayErrors.push('Telefone inválido');
    }

    if (!/^[^0-9][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[@][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,4}$/.test( this.email )
    ) {
      arrayErrors.push('Email inválido');
    }

    return arrayErrors;
  };

  validateCPF(cpf: string): boolean {
    if (typeof cpf !== 'string') return false;
    cpf = cpf.replace(/[\s.-]*/gim, '');
    if (
      !cpf ||
      cpf.length != 11 ||
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999'
    ) {
      return false;
    }
    var soma = 0;
    var resto;
    for (var i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (var i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11))) return false;
    return true;
  }
}
