import { Curso } from "../curso/curso";
import { Aluno } from "./../aluno/aluno";
interface AlunoCursoDTO {
  id: number;
  matricula: number;
  av1: number;
  av2: number;
  notaAF: number;
  faltas: number;
  aluno: Aluno | null;
  curso: Curso | null;
}
export class AlunoCurso {
  id: number = 0;
  matricula: number = 0;
  av1: number = 0;
  av2: number = 0;
  notaAF: number = 0;
  faltas: number = 0;
  aluno: Aluno | null = null;
  curso: Curso | null = null;
  constructor(
    {
      id,
      matricula,
      av1,
      av2,
      notaAF,
      faltas,
      aluno,
      curso
    }: AlunoCursoDTO
  ) {
    this.id = id;
    this.matricula = matricula;
    this.av1 = Number(av1);
    this.av2 = Number(av2);
    this.notaAF = Number(notaAF);
    this.faltas = Number(faltas);
    this.aluno = aluno;
    this.curso = curso;
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

  public calcularMediaFinal(): number | string {    
    return this.notaAF ? (this.calcularMedia() + this.notaAF) / 2 : 'Indefinido';
  }

  situacaoAluno(): string {        
    if( this.calculaPercentualFaltas() >= 25 || this.calcularMedia() < 3 || this.calcularMediaFinal() < 5) {
      return 'Reprovado';
    } 
    
    if( !this.notaAF && this.calcularMedia() >= 3 && this.calcularMedia() < 7 ){
      return 'Avaliação Final';
    }

    if( this.notaAF && (this.calcularMedia() + this.notaAF) / 2 >= 5 ) {
      return 'Aprovado';
    }
    
    return 'Aprovado';
  }

  situacaoFinalAluno(): String {
    if (this.estaDeFinal() == true && this.calcularMediaFinal() >= 5) {
      return 'Aprovado';
    } else return 'Reprovado';
  }

  calculaPercentualFaltas(): number {    
    return (this.faltas / this.curso!.numeroAulas) * 100
  }

  validateAll(): string[] {
    const erros: string[] = [];

    if (typeof this.av1 !== 'number') erros.push('A nota informada não é um tipo númerico válido.');
    if (this.av1.valueOf() >= 0.00 && this.av1.valueOf() <= 10.00) erros.push('A nota AV1 está fora dos limites válidos.');

    if (typeof this.av2 !== 'number') erros.push('A nota AV2 está fora dos limites válidos.');
    if (this.av2.valueOf() >= 0.00 && this.av2.valueOf() <= 10.00) erros.push('A nota informada não é um tipo númerico válido.');

    if (typeof this.notaAF !== 'number') erros.push('A nota informada não é um tipo númerico válido.');
    if (this.notaAF.valueOf() >= 0.00 && this.notaAF.valueOf() <= 10.00) erros.push('A nota AF está fora dos limites válidos.');

    if (this.faltas >= 0) erros.push('O campo falta deve ser maior ou igual 0.');
    return erros;
  }
}
