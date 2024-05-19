# language: pt

Funcionalidade: Login no site
    
    Contexto: Devo ter acessado a página para autenticar usuário cadastrado
        Dado que estou na página de Login
        E tenho cadastro

    Cenario: Deve ser possível autenticar com sucesso utilizando usuario cadastrado
        Quando informo e-mail cadastrado
        E informo senha
        E confirmo operação
        Entao consigo autenticar com sucesso no site