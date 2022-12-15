export function Button(id: string, name: string, containerClass: string, atributos : Array<{name:string, valor:string}> = []) : HTMLButtonElement {
  // const container = document.createElement('div');

  // container.setAttribute('class', containerClass);

  const button = document.createElement('button');

  button.innerHTML = name;
  button.setAttribute('class', containerClass);
  button.setAttribute('id', id);

  atributos.forEach((value, i) =>{
    button.setAttribute(String(value.name),value.valor);
  })
  // container.appendChild(button);

  return button;
}
