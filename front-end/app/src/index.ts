import { AlunoCursoController } from "./aluno-curso/aluno-curso-controladora.js";
import axios from 'axios';
import { BASE_URL } from "./config/config.js";
import { getRootDiv } from "./utils/raiz-div.js";
import { router } from "./aluno/routes/router.js";
export * from './components/Button';
export * from './components/Container';
export * from './components/Form';
export * from './components/Input';
export * from './components/List';
export * from './components/Title';
export * from './components/Tabela';

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;

const alunoCursoController = new AlunoCursoController();

window.addEventListener('load', () => {
    routesSwitch();
});


function routesSwitch() {
    const root = getRootDiv();
    if (root) root.innerHTML = '';

    router('#/aluno-curso') ? alunoCursoController.init() : null;
}
