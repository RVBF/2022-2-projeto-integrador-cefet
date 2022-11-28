interface NotaDTO {
  av1: number;
  av2: number;
  mediaDeAvaliacoes: number;
  avaliaçãoFinal: number;
  mediaFinal: number;
}

export class Nota {
  av1: number = 0;
  av2: number = 0;
  mediaDeAvaliacoes: number = 0;
  avaliaçãoFinal: number = 0;
  mediaFinal: number = 0;

  constructor( {av1, av2, mediaDeAvaliacoes, avaliaçãoFinal, mediaFinal}: NotaDTO) {
    this.av1 = av1;
    this.av2 = av2;
    this.mediaDeAvaliacoes = mediaDeAvaliacoes;
    this.avaliaçãoFinal = avaliaçãoFinal;
    this.mediaFinal = mediaFinal;
  }

  calculateMediaDeAvaliacoes = (av1: number, av2: number): string  =>{
    
    let resultado: string = '';
    this.mediaDeAvaliacoes = (av1 + av2) / 2;

    if (this.mediaDeAvaliacoes >= 7) {
      resultado = 'Aprovado';
    } else if (this.mediaDeAvaliacoes >= 3 && this.mediaDeAvaliacoes < 7){
      resultado = 'Avaliação Final';
    } else {
      resultado = 'Reprovado';
    }
      return resultado;
  }

  calculateMediaFinal = (av1: number, av2: number, avaliacaoFinal: number): string => {

    let resultado: string = '';

    this.mediaDeAvaliacoes = (av1 + av2) / 2;
    this.mediaFinal = (this.mediaDeAvaliacoes + avaliacaoFinal) / 2;

    if (this.mediaFinal >= 5 ){
      resultado = 'Aprovado';
    } else {
      resultado = 'Reprovado';
    }
    return resultado;
  }
}