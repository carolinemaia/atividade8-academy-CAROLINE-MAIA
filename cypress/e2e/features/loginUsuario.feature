# language: pt

Funcionalidade: Login no site
    
    Contexto: Devo ter acessado a página para autenticar usuário cadastrado
        Dado que estou na página de Login
     
    Cenario: Deve ser possível autenticar com sucesso utilizando usuario cadastrado
        E tenho cadastro
        Quando informo e-mail cadastrado
        E informo senha
        E confirmo operação
        Entao consigo autenticar com sucesso no site

    Cenário: Não deve ser possível autenticar com usuario nao cadastrado
        Quando informo e-mail nao cadastrado
        E informo senha
        E confirmo operação
        Então nao consigo autenticar com mensagem informando usuário inválido
        E o botao Ok deve retornar para o formulário

    Cenário: Não deve ser possível autenticar sem informar o campo Email
        E não informo e-mail
        Quando informo senha
        E confirmo operação
        Então não consigo autenticar com mensagem no formulário solicitando email

    Cenário: Não deve ser possível autenticar sem informar o campo Senha
        Quando informo e-mail cadastrado
        E não informo senha
        E confirmo operação
        Então não consigo autenticar com mensagem no formulário solicitando senha
    
    Cenário: Não deve ser possível autenticar sem informar os campos obrigatórios
        Quando não informo e-mail
        E não informo senha
        E confirmo operação
        Então não consigo autenticar com mensagem no formulário solicitando email e senha
