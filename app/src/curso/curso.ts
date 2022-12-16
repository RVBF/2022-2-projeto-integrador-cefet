interface CursoDTO {
  id: number;
  codigo: string;
  nome: string;
  situacao: string;
  dataInicio: Date;
  dataFim: Date;
}
export class Curso {
  id: number;
  codigo: string;
  nome: string;
  situacao: string;
  dataInicio: Date;
  dataFim: Date;

  constructor(
    { id, codigo, nome, situacao, dataInicio, dataFim }: CursoDTO) {
    this.id = id;
    this.codigo = codigo;
    this.nome = nome;
    this.situacao = situacao;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
  }

  validar = (): String[] => {
    const erros: String[] = [];

    if ( !/^[a-zA-Z]{3}[0-9]{2}$/.test( this.codigo ) ) {
      erros.push( 'Código inválido' );
    }

    if ( this.nome == null || this.nome.length < 2 || this.nome.length > 100){
      erros.push( 'Nome inválido' );
    }

    if ( this.situacao != 'Não iniciado' && this.situacao != 'Iniciado' && this.situacao != 'Finalizado' ) {
      erros.push( 'Situação inválida' );
    }

    if ( this.dataInicio > this.dataFim ){
      erros.push( 'Término deve ser maior que o início' );
    }
    return erros;
  }
}
