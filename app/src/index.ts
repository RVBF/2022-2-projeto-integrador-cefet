import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { AlunoCursoController } from "./aluno-curso/aluno-curso-controladora";
import { AlunoController } from "./aluno/aluno-controladora";
import { carregaProibida } from './utils/carrega-403';
import { carregarMenu } from "./utils/carrega-menu";
import { FuncionarioControladora } from "./funcionario/funcionario-controladora";
import { CursoControladora } from "./curso/curso-controladora";
import { LoginControladora } from "./login/login-controladora";
import  "chart.js"

export * from './components/Button';
export * from './components/Container';
export * from './components/Form';
export * from './components/Input';
export * from './components/List';
export * from './components/Title';
export * from './components/Tabela';
export * from "./components/Ancora";

const loginControladora = new LoginControladora();
const alunoCursoController = new AlunoCursoController();
const alunoController = new AlunoController();
const funcionarioControladora = new FuncionarioControladora();
const cursoControladora = new CursoControladora();

window.addEventListener('load', async () => {
    const urlAtual = location.pathname;
    // eslint-disable-next-line max-len
    const usuario = localStorage.getItem('usuario')
        ? JSON.parse(localStorage.getItem('usuario') || '')
        : null;

    // eslint-disable-next-line max-len
    const loginPath = !usuario || Number(usuario.expiry) < new Date()
        .getTime();

    const proibido = (/^\/403\/?$/i).test(urlAtual);
    const notasPath = (/^\/notas\/?([^\s]+)?$/i).test(urlAtual);
    const funcionariosPath = (/^\/funcionario\/?([^\s]+)?$/i).test(urlAtual);
    const alunosPath = (/^\/alunos\/?([^\s]+)?$/i).test(urlAtual);
    const cursosPath = (/^\/cursos\/?([^\s]+)?$/i).test(urlAtual);
    const usuarioLogado  = JSON.parse(String(localStorage.getItem('usuario')));
    if(usuarioLogado != null && usuarioLogado != ''){
        const nomeUsuarioCampo = document.getElementById('nome_usuario_menu') as HTMLElement;
        nomeUsuarioCampo.innerHTML = usuario.item.nome
        const emailUsuarioCampo = document.getElementById('email_usuario_menu') as HTMLElement;
        emailUsuarioCampo.innerHTML = usuario.item.email
    }

    if (proibido) {
        await carregaProibida();
    } 
    else if (!loginPath && urlAtual === '/') {
        location.href = '/';
    } 
    else if (loginPath) {
        if (location.pathname !== '/') {
            location.href = '/';
        }
        loginControladora.init();
    }
    else if (notasPath) {
        alunoCursoController.init();
    } else if (funcionariosPath) {
        funcionarioControladora.init();
    } else if (alunosPath) {
        alunoController.init();
    } else if (cursosPath) {
        cursoControladora.init();
    }

    setTimeout(async () => {
        if (!loginPath && !proibido) {
            await carregarMenu(urlAtual.replace('/', ''));
            const botaoDeslogar = document.getElementById('deslogar');

            botaoDeslogar?.addEventListener('click', async (event) => {
                event.preventDefault();
                await loginControladora.deslogar();
            });
        }
    }, 100);


    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});


