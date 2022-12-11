interface CursoDTO {
  id: string;
  codigo: number;
  nome: String;
  situacao: String;
  inicio: String;
  termino: String;
}
export class Curso {
  id: string;
  codigo: number;
  nome: String;
  situacao: String;
  inicio: String;
  termino: String;
  constructor(
    {
      id,
      codigo,
      nome,
      situacao,
      inicio,
      termino
    }: CursoDTO
  ) {
    this.id = id;
    this.codigo = codigo;
    this.nome = nome;
    this.situacao = situacao;
    this.inicio = inicio;
    this.termino = termino;
  }

  validar(): string[] {
    const erros: string[] = [];

    return erros;
  }
}
