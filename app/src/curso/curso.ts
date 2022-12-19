import { Funcionario } from "../funcionario/funcionario";

interface CursoDTO {
  id: number;
  codigo: string;
  nome: string;
  situacao: string;
  numeroAulas: Number;
  dataInicio: Date | null;
  dataFim: Date | null;
  professor: Funcionario | null;
}
export class Curso {
  id: number;
  codigo: string;
  nome: string;
  situacao: string;
  numeroAulas: Number;
  dataInicio: Date | null;
  dataFim: Date | null;
  professor: Funcionario | null;
   curso: any;

  constructor(
    { id, codigo, nome, situacao, numeroAulas, dataInicio, dataFim, professor}: CursoDTO) {
    this.id = id;
    this.codigo = codigo;
    this.nome = nome;
    this.situacao = situacao;
    this.numeroAulas = numeroAulas;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
    this.professor = professor;
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

    if (this.dataInicio != null && this.dataFim != null  && this.dataInicio > this.dataFim ){
      erros.push( 'Término deve ser maior que o início' );
    }
    return erros;
  }
}
