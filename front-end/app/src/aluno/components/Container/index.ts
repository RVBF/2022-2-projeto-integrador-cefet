export function Container(className: string) {
  const container = document.createElement('div');
  container.setAttribute('class', className);

  return container;
}
