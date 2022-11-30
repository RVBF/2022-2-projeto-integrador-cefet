import { List } from '../../../../../components/List';


export function Alunos(data: any) {
  const container = document.createElement('div');

  container.setAttribute('class', 'user-info');
  const header = document.createElement('header');

  const h2 = document.createElement('h1');

  h2.append('Alunos');

  header.appendChild(h2);

  const alunosContainer = document.createElement('div');

  alunosContainer.setAttribute('class', 'members-container');

  alunosContainer.appendChild(header);

  const content = document.createElement('div');

  alunosContainer.appendChild(content);

  List(content, data, {
    delete: '/#/deletar',
    edit: '/#/salvar',
  });

  container.appendChild(alunosContainer);

  return container;
}
