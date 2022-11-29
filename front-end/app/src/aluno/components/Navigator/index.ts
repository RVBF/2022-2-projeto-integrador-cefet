export function Navigator(name: string, href: string) {
  const add = document.createElement('a');
  add.setAttribute('href', `/#/${href}`);
  add.append(name);

  return add;
}
