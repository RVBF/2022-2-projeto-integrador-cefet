import { Aluno } from "./../aluno/aluno";
interface AlunoCursoDTO {
  id: number;
  matricula: number;
  av1: number;
  av2: number;
  notaAF: number;
  falta: number;
  aluno: Aluno | null;
}
export class AlunoCurso {
  id: number = 0;
  matricula: number = 0;
  av1: number = 0;
  av2: number = 0;
  notaAF: number = 0;
  falta: number = 0;
  aluno: Aluno | null = null;
  constructor(
    {
      id,
      matricula,
      av1,
      av2,
      notaAF,
      falta,
      aluno
    }: AlunoCursoDTO
  ) {
    this.id = id;
    this.matricula = matricula;
    this.av1 = Number(av1);
    this.av2 = Number(av2);
    this.notaAF = Number(notaAF);
    this.falta = Number(falta);
    this.aluno = aluno;
  }

  estaDeFinal(): boolean {
    const media = this.calcularMedia();
    return media < 7.00 && media >= 3.00;
  }

  estaReprovado(): boolean {
    const media = this.calcularMedia();
    const mediaFinal = this.calcularMediaFinal();
    return media < 3.00 || mediaFinal < 5.00;
  }

  public calcularMedia(): number {
    return (this.av1 + this.av2) / 2;
  }

  public calcularMediaFinal(): number {
    return (this.estaDeFinal()) ? (this.calcularMedia() + this.notaAF) / 2 : this.calcularMedia();
  }

  situacaoAluno(): String {
    if (this.calcularMedia() >= 7) {
      return 'Aprovado';
    } else if (this.calcularMedia() >= 3 && this.calcularMedia() < 7) {
      return 'Avaliação Final';
    }
    else return 'Reprovado';
  }

  situacaoFinalAluno(): String {
    if (this.estaDeFinal() == true && this.calcularMediaFinal() >= 5) {
      return 'Aprovado';
    } else return 'Reprovado';
  }

  validateAll(): string[] {
    const erros: string[] = [];

    if (typeof this.av1 !== 'number') erros.push('A nota informada não é um tipo númerico válido.');
    if (this.av1.valueOf() >= 0.00 && this.av1.valueOf() <= 10.00) erros.push('A nota AV1 está fora dos limites válidos.');

    if (typeof this.av2 !== 'number') erros.push('A nota AV2 está fora dos limites válidos.');
    if (this.av2.valueOf() >= 0.00 && this.av2.valueOf() <= 10.00) erros.push('A nota informada não é um tipo númerico válido.');

    if (typeof this.notaAF !== 'number') erros.push('A nota informada não é um tipo númerico válido.');
    if (this.notaAF.valueOf() >= 0.00 && this.notaAF.valueOf() <= 10.00) erros.push('A nota AF está fora dos limites válidos.');

    if (this.falta >= 0) erros.push('O campo falta deve ser maior ou igual 0.');
    return erros;
  }
}
