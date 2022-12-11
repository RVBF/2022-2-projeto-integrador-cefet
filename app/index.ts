import { AlunoCursoController } from "./src/aluno-curso/aluno-curso-controladora";
import { AlunoController } from "./src/aluno/aluno-controladora";
import { carregarPagina } from "./src/utils/carrega-pagina";
import { DashboardController } from "./src/dashboard/index-controladora";
import { path } from "./src/utils/caminho-pagina";

// import { CursoController } from "./src/curso/curso-controladora";
// import { FuncionarioControlle } from "./src/funcionario/fuci-controladora";
// import { switchRouter } from "./src/routes/app.routes";
export * from './src/components/Button';
export * from './src/components/Container';
export * from './src/components/Form';
export * from './src/components/Input';
export * from './src/components/List';
export * from './src/components/Title';
export * from './src/components/Tabela';


const alunoCursoController = new AlunoCursoController();
const alunoController = new AlunoController();
const dashboardController = new DashboardController();
// const cursoController = new CursoController();
// const funcionarioController = new FuncionarioController();

window.addEventListener('load', () => {
    const [main] = document.getElementsByTagName('main');

    // const [main] = document.getElementsByTagName('main');
    // if (document.location.pathname == '/') dashboardController.init();
    // else if (document.location.href.search('dashboard') != -1) dashboardController.init();
    // else if (document.location.href.search('notas') != -1) alunoCursoController.init();
    // else if (document.location.href.search('aluno') != -1) alunoController.init();
    // else if (document.location.href.search('funcionario') != -1) funcionarioController.init(); 
    // else if (document.location.href.search('curso') != -1) cursoController.init(); 

    const urlAtual = location.pathname;
    // eslint-disable-next-line max-len
    // const usuario = localStorage.getItem( 'usuario' )
    //     ? JSON.parse( localStorage.getItem( 'usuario' ) || '' )
    //     : null;

    // eslint-disable-next-line max-len
    // const loginPath = !usuario || Number( usuario.expiry ) < new Date()
    //     .getTime();

    const proibido = ( /^\/403\/?$/i ).test( urlAtual );
    const notasPath = ( /^\/notas\/?([^\s]+)?$/i ).test( urlAtual );
    const funcionariosPath = ( /^\/funcionarios\/?([^\s]+)?$/i ).test( urlAtual );
    const alunosPath = ( /^\/alunos\/?([^\s]+)?$/i ).test( urlAtual );
    if ( proibido ) {
        // await carregaProibida();
    } else if ( notasPath ) {
        alunoCursoController.init();
    } 
    else if ( funcionariosPath ) {
        // funcionarioController.init();
    } else if ( alunosPath ) {
        alunoController.init();
    }

    // setTimeout( async () => {
    //     if ( !loginPath && !proibido ) {
    //         await carregarMenu( urlAtual.replace( '/', '' ) );
    //         const botaoDeslogar = document.getElementById( 'deslogar' );

    //         botaoDeslogar?.addEventListener( 'click', async ( event ) => {
    //             event.preventDefault();
    //             await loginControladora.deslogar();
    //         } );
    //     }
    // }, 100 );
});


