#language: pt

Funcionalidade: Gerenciar Conta

    # Cenário: Nao deve ser possivel editar informaçoes sem autenticar-se no site
    #     Dado que estou na pagina inicial
    #     E acesso o endereço do Perfil
    #     Entao o usuario é direcionado para tela de Login

    Contexto: Devo está logado no site
        Dado que realizei login no site
        E acesso a tela de Perfil
    
    # Cenário: Deve ser possivel alterar visualizar os dados da tela de Perfil após autenticar
    #     Dado que realizei login no site
    #     E acesso a tela de Perfil
    #     Entao consigo visualizar meus dados
    #     E consigo visualizar a opção de gerenciar Conta
    #     E consigo visualizar a opçao de Logout

    #Verificar como pegar os dados do usuario dentro dos campos
    # Cenário: Deve ser possivel o usuario visualizar seus dados na tela de Gerenciamento de Conta
    #     Quando acesso a tela de gerenciamento de Conta
    #     Entao é possivel visualizar informaçoes do seu cadastro

    Cenário: Deve ser possível para usuario editar seu próprio nome 
        E acesso a tela de gerenciamento de Conta
        Quando realizo a edição do nome
        E confirmo a operação
        Entao a operaçao é finalizada com mensagem de informações atualizadas com sucesso
        E ao clicar OK o nome deve está atualizado

        


