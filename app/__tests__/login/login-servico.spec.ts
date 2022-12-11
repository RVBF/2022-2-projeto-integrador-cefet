import { LoginServico } from '../../src/login/login-servico';
import { LoginUsuario } from '../../src/login/login-usuario';

const localStorageMock = ( () => {
    let store: { [key: string]: string | null} = {};

    return {
        getItem( key: string ) {
            return store[ key ];
        },
        setItem( key: string, value: any ) {
            store[ key ] = value.toString();
        },
        clear() {
            store = {};
        },
        removeItem( key: string ) {
            delete store[ key ];
        },
    };
} )();

Object.defineProperty( global, 'localStorage', {
    value: localStorageMock,
} );

const makeSut = (): LoginServico => {
    const loginServico = new LoginServico();

    loginServico.loginRepositorio.autenticar = jest.fn()
        .mockReturnValue( Promise.resolve( {
            id: 0,
            nomeCompleto: 'Teste nome',
            setorId: 0,
            perfil: 'Admin',
        } ) );

    return loginServico;
};

describe( 'AvisoServico', () => {
    test( 'Deve autenticar e validar login e senha', async () => {
        const loginServico = makeSut();
        const usuario = new LoginUsuario( { id: 0, login: 'teste_login', senha: 'teste_senha' } );

        expect( await loginServico.autenticar( usuario ) )
            .toEqual( {
                id: 0,
                nomeCompleto: 'Teste nome',
                setorId: 0,
                perfil: 'Admin',
            } );
    } );

    test( 'Não deve autenticar e validar login', async () => {
        const loginServico = makeSut();
        const usuario = new LoginUsuario( { id: 0, login: '', senha: 'teste_senha' } );

        // eslint-disable-next-line max-len
        await expect( loginServico.autenticar( usuario ) ).rejects.toMatchObject( { message: 'Login incorreto!' } );
    } );

    test( 'Não deve autenticar e validar senha', async () => {
        const loginServico = makeSut();
        const usuario = new LoginUsuario( { id: 0, login: 'teste_login', senha: '' } );

        // eslint-disable-next-line max-len
        await expect( loginServico.autenticar( usuario ) ).rejects.toMatchObject( { message: 'Senha incorreta!' } );
    } );

    test( 'Não deve autenticar e validar login com mais de uma palavra', async () => {
        const loginServico = makeSut();
        const usuario = new LoginUsuario( { id: 0, login: 'teste login', senha: 'teste_senha' } );

        // eslint-disable-next-line max-len
        await expect( loginServico.autenticar( usuario ) ).rejects.toMatchObject( { message: 'Login com mais de uma palavra!' } );
    } );
} );
