export function Button(id: string, name: string, containerClass: string) : HTMLButtonElement {
  // const container = document.createElement('div');

  // container.setAttribute('class', containerClass);

  const button = document.createElement('button');

  button.innerHTML = name;
  button.setAttribute('class', containerClass);
  button.setAttribute('id', id);

  // container.appendChild(button);

  return button;
}
