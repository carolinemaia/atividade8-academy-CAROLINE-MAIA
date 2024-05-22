import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { fakerPT_BR } from "@faker-js/faker";
import CadastroPage from "../pages/cadastroPage";

const regisUser = new CadastroPage();

Given("que acessei a página de cadastro de usuário", function () {
  cy.visit("/register");
});

When("informo um Nome qualquer {string}", function (nome) {
  regisUser.typeNome(nome);
});

When("informo um Nome", function () {
  const nome = fakerPT_BR.person.fullName();
  regisUser.typeNome(nome);
});

When("informo um email válido", function () {
  const email = fakerPT_BR.internet.email();
  regisUser.typeEmail(email);
});

When("informo uma senha válida", function () {
  regisUser.typeSenhaValida();
});

When("confirmo a senha informada", function () {
  regisUser.typeConfirmarSenhaValida();
});

When("informo um email com formato inválido {string}", function (email) {
  regisUser.typeEmail(email);
});

When("informo a senha {string} {string}", function (senha) {
  regisUser.typeSenhaInvalida(senha);
  regisUser.typeConfirmarSenhaInvalida(senha);
});

When("informo uma senha divergente da principal {string}", function (senha) {
  //em alguns momentos um dos exemplos do esquema de cenário quebrava informando que o campo ficou desabilitado, como forma de contorno
  //inclui um tempo de espera antes de inputar a senha
  cy.wait(2000);
  regisUser.typeConfirmarSenhaDivergente(senha);
});

When("não informo nome", function () {
  cy.get(regisUser.inputNome).invoke("val").should("be.empty");
});

When("não informo o email", function () {
  cy.get(regisUser.inputEmail).invoke("val").should("be.empty");
});

When("não informo os campos de senha", function () {
  cy.get(regisUser.inputSenha).invoke("val").should("be.empty");
  cy.get(regisUser.inputConfirmarSenha).invoke("val").should("be.empty");
});

When("confirmo a operação", function () {
  cy.intercept(
    "POST",
    "https://raromdb-3c39614e42d4.herokuapp.com/api/users"
  ).as("post");
  regisUser.clickCadastrar();
});

When("informo um email ja cadastrado", function () {
  cy.intercept("POST", "https://raromdb-3c39614e42d4.herokuapp.com/api/users", {
    statusCode: 409,
    body: {
      message: "Email already in use",
      error: "Conflict",
    },
  }).as("post");
  regisUser.typeEmail(fakerPT_BR.internet.email());
});

When("concluo o cadastro com sucesso", function () {
  regisUser.registrarUsuario();
});

When(
  "clico novamente para cadastrar com os dados do usuario recém cadastrado",
  function () {
    cy.intercept(
      "POST",
      "https://raromdb-3c39614e42d4.herokuapp.com/api/users"
    ).as("post");
    regisUser.clickCadastrar();
  }
);

Then("o usuário será registrado com sucesso como tipo comum", function () {
  cy.wait("@post").then(function (intercept) {
    type = intercept.response.body.type;
    cy.wrap(type).should("eq", 0);
    expect(intercept.response.statusCode).to.equal(201);
  });
});

Then("o site exibirá uma mensagem de cadastro com sucesso", function () {
  cy.get(regisUser.msgSucesso).contains("Cadastro realizado!");
});

Then(
  "o site verifica que o campo Nome está limpo alertando para informar o nome",
  function () {
    cy.get(regisUser.inputNome).invoke("val").should("be.empty");
    cy.get(regisUser.msgErro).contains("Informe o nome");
  }
);

Then(
  "o site verifica que o campo Email está limpo alertando para informar o email",
  function () {
    cy.get(regisUser.inputEmail).invoke("val").should("be.empty");
    cy.get(regisUser.msgErro).contains("Informe o e-mail");
  }
);

Then(
  "o site verifica que o campo Senha está limpo alertando para informar a senha",
  function () {
    cy.get(regisUser.inputSenha).invoke("val").should("be.empty");
    cy.get(regisUser.msgErro).eq(0).contains("Informe a senha");

    cy.get(regisUser.inputConfirmarSenha).invoke("val").should("be.empty");
    cy.get(regisUser.msgErro).eq(1).contains("Informe a senha");
  }
);

Then(
  "o site verifica que o campo Confirmar senha está limpo alertando para informar a senha",
  function () {
    cy.get(regisUser.inputConfirmarSenha).invoke("val").should("be.empty");
    cy.get(regisUser.msgErro).contains("Informe a senha");
  }
);

Then("o site alerta sobre os campos obrigatórios", function () {
  cy.get(regisUser.msgErro).eq(0).contains("Informe o nome");
  cy.get(regisUser.msgErro).eq(1).contains("Informe o e-mail");
  cy.get(regisUser.msgErro).eq(2).contains("Informe a senha");
  cy.get(regisUser.msgErro).eq(3).contains("Informe a senha");
});

Then(
  "a operação de registro não poderá ser concluida com alerta no formulario {string}",
  function (alerta) {
    cy.get(regisUser.msgErro).contains(alerta);
  }
);

Then("a operação de registro não poderá ser concluída", function () {
  cy.wait("@post").then(function (intercept) {
    expect(intercept.response.statusCode).to.equal(400);
  });
  cy.get(regisUser.msgFalhaCadastro).contains("Falha no cadastro.");
  cy.get(regisUser.mcsgErroCadastro).contains(
    "Não foi possível cadastrar o usuário."
  );
});

Then(
  "a operação de registro não poderá ser concluída alertando quantidade minima da senha",
  function () {
    cy.get(regisUser.msgErro)
      .eq(0)
      .contains("A senha deve ter pelo menos 6 dígitos.");
    cy.get(regisUser.msgErro)
      .eq(1)
      .contains("A senha deve ter pelo menos 6 dígitos.");
  }
);

Then(
  "a operação de registro não poderá ser concluída alertando que o e-mail ja está cadastrado",
  function () {
    cy.wait("@post").then(function (intercept) {
      expect(intercept.response.statusCode).to.equal(409);
    });
    cy.get(regisUser.msgFalhaCadastro).contains("Falha no cadastro.");
    cy.get(regisUser.mcsgErroCadastro).contains(
      "E-mail já cadastrado. Utilize outro e-mail"
    );
  }
);

Then("o botao Ok deve retornar para o formulário", function () {
  regisUser.clickOk();
  cy.get(regisUser.campoForms).eq(0).should("be.visible");
  cy.get(regisUser.campoForms).eq(1).should("be.visible");
  cy.get(regisUser.campoForms).eq(2).should("be.visible");
  cy.get(regisUser.campoForms).eq(3).should("be.visible");
});

Then(
  "a operação de registro não poderá ser concluída alertando quantidade máxima da senha",
  function () {
    cy.get(regisUser.msgErro)
      .eq(0)
      .contains("A senha deve ter no máximo 12 dígitos.");
    cy.get(regisUser.msgErro)
      .eq(1)
      .contains("A senha deve ter no máximo 12 dígitos.");
  }
);

Then("o usuario está automaticamente logado no site", function () {
  cy.wait("@auth").then(function (intercept) {
    expect(intercept.response.statusCode).to.equal(200);
  });
  cy.get(regisUser.perfil).contains("Perfil");
});
