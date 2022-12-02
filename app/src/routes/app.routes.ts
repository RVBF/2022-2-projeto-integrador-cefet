import { getLocation, router } from './router';

export async function switchRouter() {
    const root = document.getElementById('root');

    if (root) root.innerHTML = '';

    await router({ pathRouter: '/', page: 'dashboard' });

    await router({ pathRouter: '/aluno-curso', page: 'cadastrar-aluno-curso' });

    await router({ pathRouter: '/aluno', page: 'cadastrar-aluno' });

    await router({ pathRouter: '/curso', page: 'cadastrar-curso' });

    await router({ pathRouter: '/funcionario', page: 'cadastrar-funcionario' });

    if (root!.children.length === 0) {
        const location = getLocation().substring(2);

        await router({ pathRouter: `/${location}`, page: '404' });
    }
}
