
export function List(
  container: HTMLElement,
  data: any,
  options?: {
    edit: string;
    delete: string;
  },
) {
  data.forEach((item: { username: string; id: string }) => {
    const content = document.createElement('div');

    content.setAttribute('class', 'user-content');

    const name = document.createElement('h3');

    name.append(item.username);

    content.appendChild(name);

    if (options) {
      const edit = document.createElement('a');
      edit.setAttribute('href', `${options.edit}?id=${item.id}`);

      const deletes = document.createElement('a');
      deletes.setAttribute('href', `${options.delete}?id=${item.id}`);

      edit.append('Editar');
      deletes.append('Deletar');

      content.appendChild(edit);
      content.appendChild(deletes);
    }

    container.appendChild(content);
  });
}
