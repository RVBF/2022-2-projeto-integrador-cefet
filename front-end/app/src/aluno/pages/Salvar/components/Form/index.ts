import {
  Button,
  Container,
  Input,
  Title,
  Form as FormInput,
} from '../../../../../components';

import * as actions from './actions';


export function Form() {
  // Sorry about that
  const id = window.location.hash.split('?')[1]?.split('=')[1];

  const container = Container('create-history-container');

  const title = Title(id ? 'Editar aluno' : 'Cadastrar aluno');

  const button = Button(
    'add-student',
    'Adicionar',
    'add-history-button-container',
  );

  const form = FormInput();

  const inputs = {
    name: Input({
      label: 'Nome',
      placeholder: 'Digite seu nome',
      containerClass: 'history-name-content',
      value: '',
    }),
    sobrenome: Input({
      label: 'Sobrenome',
      placeholder: 'Digite seu sobrenome',
      containerClass: 'history-name-content',
      value: '',
    }),
    nota: Input({
      label: 'Nota',
      placeholder: 'Digite sua nota',
      containerClass: 'history-name-content',
      value: '',
    }),
  };

  form.appendChild(title);
  form.appendChild(inputs.name.container);
  form.appendChild(inputs.sobrenome.container);
  form.appendChild(inputs.nota.container);
  form.appendChild(button.container);

  container.appendChild(form);

  actions.save(button.button, inputs, id);

  return container;
}
