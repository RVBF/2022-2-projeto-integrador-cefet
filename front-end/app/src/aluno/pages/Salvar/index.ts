import { Container } from '../../../components';
import { Navigator } from '../../../components/Navigator';
import { Form } from './components/Form';


export async function Salvar(root: HTMLDivElement) {
  const main = document.createElement('main');

  main.setAttribute('class', 'main-content');

  const content = Container('content');

  const goback = Navigator('Voltar', '');

  content.appendChild(Form());
  main.appendChild(goback);

  main.appendChild(content);

  root.appendChild(main);
}
