#language: pt

Funcionalidade: Gerenciar Contam

    Contexto: Devo está logado no site
        Dado que estou logado no site como usuario comum
        E acessei a tela de Perfil
    
    Cenário: Deve ser possivel visualizar os dados da tela de Perfil após autenticar
        Entao consigo visualizar meus dados
        E consigo visualizar a opção de gerenciar Conta
        E consigo visualizar a opçao de Logout

    Cenário: Deve ser possível para usuario editar seu próprio nome 
        E acesso a tela de gerenciamento de Conta
        Quando realizo a edição do nome
        E confirmo a operação
        Entao a operaçao é finalizada com mensagem de informações atualizadas com sucesso
        E ao clicar OK o nome deve está atualizado

    Cenário: Deve ser possível para usuario editar sua senha
        E acesso a tela de gerenciamento de Conta
        Quando clico em Alterar Senha
        E realizo a edição da senha principal e confirmação de senha
        E confirmo a operação
        Entao a operaçao é finalizada com mensagem de informações atualizadas com sucesso
        E o botao Ok deve retornar para o formulário

    Cenário: Deve ser possível para usuário editar seu nome e senha juntos
        E acesso a tela de gerenciamento de Conta
        Quando realizo a edição do nome
        E clico em Alterar Senha
        E realizo a edição da senha principal e confirmação de senha
        E confirmo a operação
        Entao a operaçao é finalizada com mensagem de informações atualizadas com sucesso
        E o botao Ok deve retornar para o formulário

    Cenário: Devem ficar visiveis os campos de senha ao clicar em Alterar Senha
        E acesso a tela de gerenciamento de Conta
        E clico em Alterar Senha
        E os campos de senhas ficam habilitados
        Quando clico em cancelar
        Entao os campos de senhas ficam desabilitados

    Cenário: Não deve ser possível para o usuário comum alterar o tipo de usuário
        Quando acesso a tela de gerenciamento de Conta
        Entao o campo de alterar usuario nao deve estar disponível

    Cenário: Não deve ser possível para o usuário alterar seu email
        Quando acesso a tela de gerenciamento de Conta
        Então o campo de alterar email não deve estar disponível

    Cenário: Não deve ser possível alterar senha sem confirmar a senha principal
        E acesso a tela de gerenciamento de Conta
        E clico em Alterar Senha
        Quando altero a senha principal
        E nao confirmo a senha
        E confirmo a operação
        Entao o site verifica que o campo Confirmar senha está limpo com alerta no formulario

    Cenário: Não deve ser possivel alterar a confirmação de senha senha divergente da senha principal
        E acesso a tela de gerenciamento de Conta
        E clico em Alterar Senha
        Quando altero a senha principal
        E confirmo a senha principal "<confirmarSenha>"
        E confirmo a operação
        Então a operação de registro não poderá ser concluida com alerta no formulario "<alerta>"
        Exemplos:
        |     confirmarSenha   |               alerta                    |
        |         12345        | A senha deve ter pelo menos 6 dígitos.  |
        |         abcde        | A senha deve ter pelo menos 6 dígitos.  |
        |        12345g        | As senhas devem ser iguais.             |
        |        carolm        | As senhas devem ser iguais.             |
        |      1234567890123   | As senhas devem ser iguais.             |

    Esquema do Cenário: Não deve ser possivel atualizar senha menor que 6 digitos
        E acesso a tela de gerenciamento de Conta
        E clico em Alterar Senha
        Quando altero a senha principal "<senha>"
        E confirmo a senha principal "<confirmarSenha>"
        E confirmo a operação
        Entao a operação de registro não poderá ser concluida com alerta no formulario informando quantidade minima
        Exemplos: 
        |          senha       |  confirmarSenha    |
        |          123         |        123         |                           
        |          1           |         1          |       
        |         12345        |        12345       |

# #cenário de teste quebra pois nao é alertado mensagem de quantidade máxima como informa no cadastro e como também alerta sobre quantidade mínima, envia a requisiçao pra API
    Esquema do Cenário: Não deve ser possivel atualizar senha maior que 12 digitos
        E acesso a tela de gerenciamento de Conta
        E clico em Alterar Senha
        Quando altero a senha principal "<senha>"
        E confirmo a senha principal "<confirmarSenha>"
        E confirmo a operação
        Entao a operação de registro não poderá ser concluida com alerta no formulario informando quantidade máxima
        Exemplos: 
        |       senha          |  confirmarSenha    |
        |   0123456789123      |  0123456789123     |                           
        |   asdfghjkloiuyt     |  asdfghjkloiuyt    | 
