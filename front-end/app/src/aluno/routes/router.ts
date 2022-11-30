import { url } from './parameters.routes';

export function router(pathRouter: string) {
  const locationHash = url(window.location.hash);
  return locationHash === pathRouter;
}
