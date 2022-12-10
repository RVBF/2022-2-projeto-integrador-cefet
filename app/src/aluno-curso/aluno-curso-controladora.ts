import { AlunoCurso } from './aluno-curso';
import { ServicoAlunoCurso } from './aluno-curso-servico';
import { VisaoAlunoCurso } from './aluno-curso-visao';
import { carregarPagina } from './../utils/carrega-pagina';
export class AlunoCursoController {
    servicoAlunoCurso: ServicoAlunoCurso;
    visaoAlunoCurso: VisaoAlunoCurso;

    constructor() {
        this.servicoAlunoCurso = new ServicoAlunoCurso();
        this.visaoAlunoCurso = new VisaoAlunoCurso();
    }

    async init(): Promise<void> {
        const [main] = document.getElementsByTagName('main');

        if (this.visaoAlunoCurso.listarNotasRegex()) {
            main.innerHTML = await carregarPagina('/aluno-curso/notas.html');

            await this.insertDataToView();
        }
        else if (this.visaoAlunoCurso.cadastrosRegex()) {
            main.innerHTML = await carregarPagina('/aluno-curso/nota-cadastro.html');
            await this.cadastrar();
        }
        // else if ( this.visaoAlunoCurso.atualizarNotaRegex() ) {
        //     main.innerHTML = await carregarPagina(
        //         '../../public/usuario/usuarios-cadastro-form.html',
        //     );
        //     // const usuarioId = this.servicoUsuario.catchUrlId();

        //     // this.preencheSelect();
        //     // await this.insertDataToViewEdit( usuarioId );
        //     // this.visaoUsuario.aoDispararEditar( this.editar );
        // }
    }

    async insertDataToView(): Promise<void> {
        try {
            const alunoCurso: AlunoCurso[] = await this.servicoAlunoCurso.todos(10, 1);
            this.visaoAlunoCurso.desenhar(alunoCurso);

        } catch (error: any) {
            this.visaoAlunoCurso.showErrorMessage(error.message);
        }
    }

    // async insertDataToViewEdit(usuarioId: number): Promise<void> {
    //     try {
    //         const usuario = await this.servicoUsuario.pegaUsuario(usuarioId);

    //         this.visaoUsuario.drawEdit(usuario);
    //     } catch (error: any) {
    //         this.visaoUsuario.showErrorMessage(error.message);
    //     }
    // }


    cadastrar = async (): Promise<void> => {
        try {
            this.visaoAlunoCurso.desenharCadastro();

            this.visaoAlunoCurso.aoDispararCadastrar(() => {
                const aluno = this.visaoAlunoCurso.pegarDadosDoFormCadastro();

                this.servicoAlunoCurso.adicionar(aluno);

                // setTimeout(() => {
                //     location.href = '/notas';
                // }, 2000);
            });

        } catch (error: any) {
            this.visaoAlunoCurso.habilitaBotao();
            this.visaoAlunoCurso.showErrorMessage(error.message);
        }
    };

    // editar = async (): Promise<void> => {
    //     const aviso = this.visaoUsuario.pegarDadosDoFormEditar();

    //     try {
    //         this.visaoUsuario.desabilitaBotao();
    //         await this.servicoUsuario.atualizarUsuario(aviso);

    //         this.visaoUsuario.showSuccessMessage('Usuário atualizado com sucesso!');
    //         setTimeout(() => {
    //             location.href = '/usuarios';
    //         }, 2000);
    //     } catch (error: any) {
    //         this.visaoUsuario.habilitaBotao();
    //         this.visaoUsuario.showErrorMessage(error.message);
    //     }
    // };

    showErrorMessage(): Promise<void> {
        throw new Error('Avisos não encontrados.');
    }
}
