/* eslint-disable @typescript-eslint/no-use-before-define */
import { Navigator } from '../../components/Navigator';
import { Alunos } from './components/Alunos';

import './styles.scss';

export async function Listar(root: HTMLDivElement) {
  const main = document.createElement('main');
  const content = document.createElement('div');

  // Atributos
  main.setAttribute('class', 'main-content-game');

  const add = Navigator('Salvar', 'salvar');

  // Atributos
  content.setAttribute('class', 'content');

  const list = Alunos([
    { username: 'Name 1', id: '1' },
    { username: 'Name 2', id: '2' },
    { username: 'Name 3', id: '3' },
  ]);

  // Filhos
  content.appendChild(list);
  content.appendChild(add);

  main.appendChild(content);

  // Montar
  root.appendChild(main);
}
