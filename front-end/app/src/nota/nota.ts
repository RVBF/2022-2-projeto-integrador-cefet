export class AlunoCurso {
  constructor(
    public matricula: number,
    public notaAv1: number,
    public notaAv2: number,
    public notaF: number,
  ) {}

  validar(): string[] {
    const problemas: string[] = [];

    if (this.notaAv1 instanceof number) problemas.push('Por favor, informe o nome.');
    if (this.telefone.length < 9) problemas.push('Por favor, infomrar o telefone.');
    return problemas;
  }
}
