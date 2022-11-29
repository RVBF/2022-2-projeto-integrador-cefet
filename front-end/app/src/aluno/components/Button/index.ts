export function Button(id: string, name: string, containerClass: string) {
  const container = document.createElement('div');

  container.setAttribute('class', containerClass);

  const button = document.createElement('button');

  button.append(name);
  button.setAttribute('class', 'button');
  button.setAttribute('id', id);

  container.appendChild(button);

  return { container, button };
}
