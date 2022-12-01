Funcionalidade: Cadastrar um aluno
Como funcionario
Eu desejo realizar o cadastro de alunos
Para realizar o lançamento de notas

Cenário: Cadastrar um aluno

  Variante: Procurar por concordia no google
    Dado que estou na {Tela de cadastro de alunos}
    Quando eu informo o {nome}
      E eu informo o {cpf}
      E eu informo o {telefone}
      E eu informo o {email}
    Então eu vejo "Aluno cadastrado com sucesso!"

Constantes:

"Tela de cadastro de alunos" é "http://127.0.0.1/alunos"

Elemento de IU: nome
  - id é "#nome"
  - tipo de dado é string
  - required
      Caso o contrário eu vejo "Preencha este campo."
  - comprimento mínimo é 2
      Caso o contrário eu vejo "Erro ao cadastrar aluno."
  - comprimento máximo é 100
      Caso o contrário eu vejo "Erro ao cadastrar aluno."

Elemento de IU: cpf
  - id é "#cpf"
  - tipo de dado é string
  - comprimento mínimo é 11
      Caso o contrário eu vejo "Erro ao cadastrar aluno."


Elemento de IU: telefone
  - id é "#telefone"
  - tipo de dado é string
  - comprimento mínimo é 8
      Caso o contrário eu vejo "Erro ao cadastrar aluno."

Elemento de IU: email
  - id é "#email"
  - tipo de dado é string