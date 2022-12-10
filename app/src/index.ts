import M from "materialize-css";
// import * as style from "./style/_global.scss";
import "materialize-css/dist/css/materialize.min.css";
import { AlunoCursoController } from "./aluno-curso/aluno-curso-controladora";
import { AlunoController } from "./aluno/aluno-controladora";
import { carregarPagina } from "./utils/carrega-pagina";
import { DashboardController } from "./dashboard/index-controladora";

// import { CursoController } from "./curso/curso-controladora";
// import { FuncionarioControlle } from "./funcionario/fuci-controladora";
export * from './components/Button';
export * from './components/Container';
export * from './components/Form';
export * from './components/Input';
export * from './components/List';
export * from './components/Title';
export * from './components/Tabela';

const alunoCursoController = new AlunoCursoController();
const alunoController = new AlunoController();
const dashboardController = new DashboardController();
// const cursoController = new CursoController();
// const funcionarioController = new FuncionarioController();

window.addEventListener('load', () => {
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

    const proibido = (/^\/403\/?$/i).test(urlAtual);
    const notasPath = (/^\/notas\/?([^\s]+)?$/i).test(urlAtual);
    const funcionariosPath = (/^\/funcionarios\/?([^\s]+)?$/i).test(urlAtual);
    const alunosPath = (/^\/alunos\/?([^\s]+)?$/i).test(urlAtual);
    if (proibido) {
        // await carregaProibida();
    } else if (notasPath) {
        alunoCursoController.init();
    }
    else if (funcionariosPath) {
        // funcionarioController.init();
    } else if (alunosPath) {
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


    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});


