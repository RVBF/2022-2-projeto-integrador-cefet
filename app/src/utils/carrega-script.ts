export function loadScript(id: any, path: any) {

    const script = document.createElement('script');

    script.src = path;
    script.type = 'module';
    script.id = id;

    document.body.appendChild(script);
}
