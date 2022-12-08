import { AlunoCurso } from './aluno-curso';
import { ServicoAlunoCurso } from './aluno-curso-servico';
import { VisaoListagem } from './aluno-curso-visao';
import { carregarPagina } from '../utils/carrega-pagina'
/* eslint-disable-next-line func-style */
async function loadPage(file: string): Promise<string> {
    const response = await fetch(file);

    return response.text();
}

export class AlunoCursoController {
    servicoAlunoCurso: ServicoAlunoCurso;
    visaoListagem: VisaoListagem;

    constructor() {
        this.servicoAlunoCurso = new ServicoAlunoCurso();
        this.visaoListagem = new VisaoListagem();
    }

    async init(): Promise<void> {
               console.log('entrie');

        const [main] = document.getElementsByTagName('main');
        console.log(this.visaoListagem.listarnotasRegex());
        console.log(this.visaoListagem.cadastroNotaRegex());

        if ( this.visaoListagem.listarnotasRegex() ) {
            main.innerHTML = await carregarPagina( 'aluno-curso-table.html' );

            await this.insertDataToView();
        } else if ( this.visaoListagem.cadastroNotaRegex() ) {

            main.innerHTML = await carregarPagina( 'cadastrar-aluno-curso.html' );

            // this.preencheSelect();
            // this.visaoListagem.aoDispararCadastrar( this.cadastrar );
        } else if ( this.visaoListagem.atualizarNotaRegex() ) {
            main.innerHTML = await carregarPagina(
                '../../public/usuario/usuarios-cadastro-form.html',
            );
            // const usuarioId = this.servicoUsuario.catchUrlId();

            // this.preencheSelect();
            // await this.insertDataToViewEdit( usuarioId );
            // this.visaoUsuario.aoDispararEditar( this.editar );
        }
    }

    async insertDataToView(): Promise<void> {
        try {
            const alunoCurso: AlunoCurso[] = await this.servicoAlunoCurso.todos(10, 1);
            this.visaoListagem.desenhar(alunoCurso);
        } catch (error: any) {
            this.visaoListagem.showErrorMessage(error.message);
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


    // cadastrar = async (): Promise<void> => {
    //     const aviso = this.visaoListagem.pegarDadosDoFormCadastro();

    //     try {
    //         this.visaoListagem.desabilitaBotao();
    //         await this.visaoListagem.cad;
    //         this.visaoListagem.showSuccessMessage('Usuário cadastrado com sucesso!');
    //         setTimeout(() => {
    //             location.href = API'/usuarios';
    //         }, 2000);
    //     } catch (error: any) {
    //         this.visaoListagem.habilitaBotao();
    //         this.visaoListagem.showErrorMessage(error.message);
    //     }
    // };

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
