interface CursoDTO {
  id: number;
  codigo: number;
  nome: String;
  siuacao: String;
  inicio: Date;
  termino: Date;
}
export class Curso {
   id: number;
   codigo: number;
   nome: String;
   siuacao: String;
   inicio: Date;
   termino: Date;
  constructor(
    {
      id,
      codigo,
      nome,
      siuacao,
      inicio,
      termino
    }: CursoDTO
  ) {
      this.id = id;
      this.codigo = Number(codigo);
      this.nome = nome;
      this.siuacao = siuacao;
      this.inicio = inicio;
      this.termino = termino;
  }

  validar(): string[] {
    const erros: string[] = [];

    return erros;
  }
}
