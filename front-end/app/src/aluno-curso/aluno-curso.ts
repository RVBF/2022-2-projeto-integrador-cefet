import { Aluno } from "../aluno/aluno.js";
interface AlunoCursoDTO {
  id: number;
  matricula: number;
  notaAv1: number;
  notaAv2: number;
  notaAF: number;
  falta: number;
  aluno: Aluno|null;
}
export class AlunoCurso {
  id: number = 0;
  matricula: number = 0;
  notaAv1: number = 0;
  notaAv2: number = 0;
  notaAF: number = 0;
  falta: number = 0;
  aluno: Aluno|null = null;
  constructor(
    {
      id,
      matricula,
      notaAv1,
      notaAv2,
      notaAF,
      falta,
      aluno,
    } : AlunoCursoDTO
  ) {
    this.id = id;
    this.matricula = matricula;
    this.notaAv1 = notaAv1;
    this.notaAv2 = notaAv2;
    this.notaAF = notaAF;
    this.falta = falta;
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

  calcularMedia(): number {
    return (this.notaAv1 + this.notaAv2) / 2;
  }

  calcularMediaFinal(): number {
    return (this.estaDeFinal()) ? (this.calcularMedia() + this.notaAF) / 2 : this.calcularMedia();
  }

  validar(): string[] {
    const erros: string[] = [];

    if (typeof this.notaAv1 !== 'number') erros.push('A nota informada não é um tipo númerico válido.');
    if (this.notaAv1.valueOf() >= 0.00 && this.notaAv1.valueOf() <= 10.00) erros.push('A nota AV1 está fora dos limites válidos.');

    if (typeof this.notaAv2 !== 'number') erros.push('A nota AV2 está fora dos limites válidos.');
    if (this.notaAv2.valueOf() >= 0.00 && this.notaAv2.valueOf() <= 10.00) erros.push('A nota informada não é um tipo númerico válido.');

    if (typeof this.notaAF !== 'number') erros.push('A nota informada não é um tipo númerico válido.');
    if (this.notaAF.valueOf() >= 0.00 && this.notaAF.valueOf() <= 10.00) erros.push('A nota AF está fora dos limites válidos.');

    if (this.falta >= 0) erros.push('O campo falta deve ser maior ou igual 0.');
    return erros;
  }
}
