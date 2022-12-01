export function url(locationURL: string) {
  const newURL = locationURL.match(/\?/)
    ? locationURL.split('?')[0]
    : locationURL;

  return newURL;
}

export function parameters(locationURL: string) {
  const urlParam = locationURL.split('?')[1];
  if (!urlParam) return [];
  const foundParameters = urlParam.split('&');

  const newParameters: string[] = [];

  for (const iterator of foundParameters) {
    const data = iterator.split('=');
    newParameters.push(`${data[1]}`);
  }

  return newParameters;
}
