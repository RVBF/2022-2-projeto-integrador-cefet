export function Title(name: string) {
  const title = document.createElement('h1');
  title.append(name);

  return title;
}
