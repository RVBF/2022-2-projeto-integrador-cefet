import { appConfig } from './src/config/config';
import { AlunoCursoController } from "./src/aluno-curso/aluno-curso-controladora";
// import { router } from "src/routes/router";
// export * from './components/Button';
// export * from './components/Container';
// export * from './components/Form';
// export * from './components/Input';
// export * from './components/List';
// export * from './components/Title';
// export * from './components/Tabela';


const alunoCursoController = new AlunoCursoController();

window.addEventListener('load', () => {
    routesSwitch();
});

function routesSwitch() {
    const root = getRootDiv();
    if (root) root.innerHTML = '';

    router('#/aluno-curso') ? alunoCursoController.init() : null;
}
