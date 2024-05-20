# language: pt

Funcionalidade: Login no site
    
    Contexto: Devo ter acessado a página para autenticar usuário cadastrado
        Dado que estou na página de Login
        

    # Cenario: Deve ser possível autenticar com sucesso utilizando usuario cadastrado
    #         E tenho cadastro
    #     Quando informo e-mail cadastrado
    #     E informo senha
    #     E confirmo operação
    #     Entao consigo autenticar com sucesso no site

    Cenário: Nao deve ser possível autenticar com usuario nao cadastrado
        Quando informo e-mail nao cadastrado
        E informo senha
        E confirmo operação
        Então nao consigo autenticar com mensagem informando usuário inválido 