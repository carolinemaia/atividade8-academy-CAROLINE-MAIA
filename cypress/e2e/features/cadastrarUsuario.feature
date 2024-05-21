#language: pt
Funcionalidade: Cadastrar novo usuário
    
    Contexto: Devo ter acessado a página de registro de usuário
        Dado que acessei a página de cadastro de usuário

    Esquema do Cenário: Deve ser possível registrar com sucesso um usuário
        Quando informo um Nome qualquer "<nome>"
        E informo um email válido
        E informo uma senha válida
        E confirmo a senha informada
        E confirmo a operação
        Entao o usuário será registrado com sucesso como tipo comum 
        E o site exibirá uma mensagem de cadastro com sucesso
        E o botao Ok deve retornar para o formulário
        Exemplos:
        |     nome      |
        |      1        |
        |      *        | 
        |      @        | 
        |     C. M.     |
        |     cAr01     | 
        |     🫂        |

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
    
    Cenário: Nao deve ser possível registrar um usuario sem informar os dados nos campos obrigatórios
        Quando não informo nome
        E não informo o email
        E não informo os campos de senha
        Quando confirmo a operação
        Entao o site alerta sobre os campos obrigatórios

    Cenário: Não deve ser possivel registrar um usuário com senha divergente do campo Senha e Confirmaçao Senha
        Quando informo um Nome
        E informo um email válido
        E informo uma senha válida
        E informo uma senha divergente "<senha>"
        E confirmo a operação
        Então a operação de registro não poderá ser concluida com alerta "<alerta>"
        Exemplos:
        |     senha     |               alerta                   |
        |     12345     | A senha deve ter pelo menos 6 dígitos. |
        |     abcde     | A senha deve ter pelo menos 6 dígitos. |
        |     12345g    | As senhas devem ser iguais.            |
        |     carolm    | As senhas devem ser iguais.            |
        | 1234567890123 | A senha deve ter no máximo 12 dígitos. |

     Esquema do Cenário: Não deve ser possivel registrar um usuario com senha menor que 6 digitos
        Quando informo um Nome
        E informo um email válido
        E informo a senha "<senha>" "<confirmarSenha>"
        E confirmo a operação
        Entao a operação de registro não poderá ser concluída alertando quantidade minima da senha
        Exemplos:
        |          senha       |  confirmarSenha    |
        |          12345       |        12345       |                           
        |          1234        |         1234       |       
        |           123        |         123        |  
        |           1          |          1         |      
    
    Esquema do Cenário: Não deve ser possivel registrar um usuario com senha maior que 12 digitos
        Quando informo um Nome
        E informo um email válido
        E informo a senha "<senha>" "<confirmarSenha>"
        E confirmo a operação
        Entao a operação de registro não poderá ser concluída alertando quantidade máxima da senha
        Exemplos:
        |         senha       |  confirmarSenha    |
        |      1234567890111  |    1234567890111   |                               
        |     abcdefghjkltrwe |   abcdefghjkltrwe  |       
 
        
    Esquema do Cenário: Nao deve ser possível registrar um usuário com e-mail inválido
        Quando informo um Nome
        E informo um email com formato inválido "<email>"
        E informo uma senha válida
        E confirmo a senha informada
        E confirmo a operação
        Entao a operação de registro não poderá ser concluída
        E o botao Ok deve retornar para o formulário
        Exemplos:
        |          email       |    
        |           c          |                                         
        |          123@.com    |                       
        |       carolail.com   |
        |   caromaia#gmail.com |   

   
    Cenário: Não deve ser possível registrar um usuario com email ja cadastrado
        Quando informo um Nome
        E informo um email ja cadastrado
        E informo uma senha válida
        E confirmo a senha informada
        E confirmo a operação
        Então a operação de registro não poderá ser concluída alertando que o e-mail ja está cadastrado
        E o botao Ok deve retornar para o formulário

    Cenário: Não deve ser possível registrar um usuário recém cadastrado
        Quando concluo o cadastro com sucesso
        E clico novamente para cadastrar com os dados do usuario recém cadastrado
        Então a operação de registro não poderá ser concluída alertando que o e-mail ja está cadastrado

    Cenário: Deve ser possível está automaticamente logado após registro
        Quando concluo o cadastro com sucesso
        Entao o usuario está automaticamente logado no site
