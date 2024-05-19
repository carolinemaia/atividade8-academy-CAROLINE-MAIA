#language: pt
Funcionalidade: Cadastrar novo usuário
    
    Contexto: Devo ter acessado a página de registro de usuário
        Dado que acessei a página de cadastro de usuário

    Cenário: Deve ser possível registrar um usuário com sucesso
        Quando informo um Nome
        E informo um email válido
        E informo uma senha válida
        E confirmo a senha informada
        E confirmo a operação
        Entao o usuário será registrado com mensagem de cadastro com sucesso


    Cenário: Nao deve ser possível registrar um usuário sem informar o nome
        Quando informo um email válido
        E informo uma senha válida
        E confirmo a senha informada
        E confirmo a operação
        Entao o site verifica que o campo Nome está limpo alertando para informar o nome

    Cenário: Nao deve ser possível registrar um usuário sem informar o email
        Quando informo um Nome
        E informo uma senha válida
        E confirmo a senha informada
        E confirmo a operação
        Entao o site verifica que o campo Email está limpo alertando para informar o email
    
    Cenário: Nao deve ser possível registrar um usuário sem informar a senha
        Quando informo um Nome
        E informo um email válido
        E confirmo a operação
        Entao o site verifica que o campo Senha está limpo alertando para informar a senha

    Cenário: Nao deve ser possível registrar um usuário sem confirmar a senha
        Quando informo um Nome
        E informo um email válido
        E informo uma senha válida
        E confirmo a operação
        Entao o site verifica que o campo Confirmar senha está limpo alertando para informar a senha

    


