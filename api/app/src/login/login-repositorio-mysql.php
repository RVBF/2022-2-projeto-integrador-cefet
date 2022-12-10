<?php
  require 'app/src/login/login-repositorio.php';  
  require 'app/src/login/sessao-usuario.php';  
  
  class LoginRepositorioMysql implements LoginRepositorio{    
    private $sessaoEmArquivo;
    public function __construct ( &$pdo ) {
      $this->pdo = $pdo;
      $this->sessaoEmArquivo = new SessaoEmArquivo();
    }

    function autenticar( $dadosLogin ) {
      try{
        $todosErros = $dadosLogin->validar();

        if( count($todosErros) > 0 ){
          echo implode(', ', $todosErros);
          http_response_code(400);  
          die();
        }

        $preparedStatement = $this->pdo->prepare( 'SELECT id, nome, sobrenome, setor_id, perfil FROM responsavel WHERE `login` = :l AND senha = :s' );
        $preparedStatement->execute( [ 'l' => $dadosLogin->login, 's' => $dadosLogin->senhaComHash() ] );
        if( $preparedStatement->rowCount() < 1 ) {
          echo json_encode(['error' => 'Login ou senha incorretos!']);
          http_response_code(400);  
          die();
        }

        $result = $preparedStatement->fetch( PDO::FETCH_ASSOC );
        $usuarioSessao =  new SessaoUsuario( intval($result['id']), $result['nome'], $result['sobrenome'], $result['perfil'], intval($result['setor_id']) );

        $sessaoFormatada = $usuarioSessao->sessaoFormatada();

        $this->sessaoEmArquivo->regerarId();
        $this->sessaoEmArquivo->definirValor( 'usuario', json_encode($sessaoFormatada)  );
        return $sessaoFormatada;
      } catch( Exception $e ) {
        throw new RepositorioExcecao( $e->getMessage(), $e->getCode(), $e );
      }
    }

    function deslogar() {
      try{
        if( !$this->sessaoEmArquivo->logado() ){
          http_response_code(400);
          echo 'Usuário não está logado!';
          die();
        }

        $this->sessaoEmArquivo->destruirSessao();
      } catch( Exception $e ) {
        throw new RepositorioExcecao( $e->getMessage(), $e->getCode(), $e );
      }
    }
  }