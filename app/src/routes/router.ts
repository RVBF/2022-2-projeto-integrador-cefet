import { carregarPagina } from '../utils/carrega-pagina';

export async function router({
  pathRouter = '',
  page = '',
  classSelect = null,
}) {
  const locationHash = getLocation();

  if (locationHash !== `#${pathRouter}`) {
    return null;
  }

  if (!page) {
    page = pathRouter.substring(1);
  }

  return carregarPagina(`/src/pages/${page}.html`);
}

export function getLocation() {
  const locationHash = window.location.hash;

  return locationHash.match(/\?/) ? locationHash.split('?')[0] : locationHash;
}
