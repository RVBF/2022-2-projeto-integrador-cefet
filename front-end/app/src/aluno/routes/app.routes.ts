/* eslint-disable no-unused-expressions */
import { router } from './router';
import { Listar } from '../pages/Listar';
import { Salvar } from '../pages/Salvar';
import { getRootDiv } from '../utils/getRoot';

export function routesSwitch() {
  const root = getRootDiv();
  if (root) root.innerHTML = '';

  router('#/') ? Listar(root) : null;
  router('#/salvar') ? Salvar(root) : null;
}
