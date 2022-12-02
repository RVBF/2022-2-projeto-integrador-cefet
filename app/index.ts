import { appConfig } from './src/config/config';
import { AlunoCursoController } from "./src/aluno-curso/aluno-curso-controladora";
import { router } from "./src/routes/router";
import { switchRouter } from "./src/routes/app.routes";
import { getRootDiv } from "./src/utils/raiz-div";
export * from './src/components/Button';
export * from './src/components/Container';
export * from './src/components/Form';
export * from './src/components/Input';
export * from './src/components/List';
export * from './src/components/Title';
export * from './src/components/Tabela';


const alunoCursoController = new AlunoCursoController();

window.addEventListener('load', () => {
    switchRouter();
});


