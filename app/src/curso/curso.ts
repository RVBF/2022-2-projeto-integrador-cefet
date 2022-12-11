interface CursoDTO {
  id: string;
  codigo: string;
  nome: string;
  situacao: string;
  inicio: string;
  termino: string;
}
export class Curso {
  id: string;
  codigo: string;
  nome: string;
  situacao: string;
  inicio: string;
  termino: string;

  constructor(
    { id, codigo, nome, situacao, inicio, termino }: CursoDTO) {
    this.id = id;
    this.codigo = codigo;
    this.nome = nome;
    this.situacao = situacao;
    this.inicio = inicio;
    this.termino = termino;
  }

  validar = (): String[] => {
    const erros: String[] = [];

    if ( !/^[a-zA-Z]{3}[0-9]{2}$/.test( this.codigo ) ) {
      erros.push( 'Código inválido' );
    }

    if ( this.nome == null || this.nome.length < 2 || this.nome.length > 100){
      erros.push( 'Nome inválido' );
    }

    if ( this.situacao != 'não iniciado' && this.situacao != 'iniciado' && this.situacao != 'finalizado' ) {
      erros.push( 'Situação inválida' );
    }

    if ( this.inicio > this.termino ){
      erros.push( 'Término deve ser maior que o início' );
    }
    return erros;
  }
}
