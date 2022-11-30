export function Input(data: {
  placeholder: string;
  label: string;
  containerClass?: string;
  value?: string;
}) {
  const container = document.createElement('div');
  container.setAttribute('class', data.containerClass || 'input-content');

  const containerLabel = document.createElement('label');
  containerLabel.append(data.label);

  const object = document.createElement('input');
  object.setAttribute('placeholder', data.placeholder);

  if (data.value) {
    object.value = data.value;
  }

  container.appendChild(containerLabel);
  container.appendChild(object);

  return { container, object };
}
