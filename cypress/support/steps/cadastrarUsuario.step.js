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

When("informo uma senha divergente {string}", function (senha) {
  regisUser.typeConfirmarSenhaDivergente(senha);
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

Then("o usuário será registrado com sucesso como tipo comum", function () {
  cy.wait("@post").then(function (intercept) {
    type = intercept.response.body.type;
    cy.wrap(type).should("eq", 0);
  });
});

Then("o site exibirá uma mensagem de cadastro com sucesso", function () {
  cy.get(regisUser.msgSucesso).contains("Cadastro realizado!");
});

Then(
  "o site verifica que o campo Nome está limpo alertando para informar o nome",
  function () {
    cy.get(regisUser.typeNome).invoke("val").should("be.empty");
    cy.get(regisUser.msgErro).contains("Informe o nome");
  }
);

Then(
  "o site verifica que o campo Email está limpo alertando para informar o email",
  function () {
    cy.get(regisUser.typeNome).invoke("val").should("be.empty");
    cy.get(regisUser.msgErro).contains("Informe o e-mail");
  }
);

Then(
  "o site verifica que o campo Senha está limpo alertando para informar a senha",
  function () {
    cy.get(regisUser.typeSenhaValida).invoke("val").should("be.empty");
    cy.get(regisUser.msgErro).eq(0).contains("Informe a senha");

    cy.get(regisUser.typeConfirmarSenhaValida).invoke("val").should("be.empty");
    cy.get(regisUser.msgErro).eq(1).contains("Informe a senha");
  }
);

Then(
  "o site verifica que o campo Confirmar senha está limpo alertando para informar a senha",
  function () {
    cy.get(regisUser.typeConfirmarSenhaValida).invoke("val").should("be.empty");
    cy.get(regisUser.msgErro).contains("Informe a senha");
  }
);

Then("o site alerta sobre os campos obrigatórios", function () {
  cy.get(regisUser.typeNome).invoke("val").should("be.empty");
  cy.get(regisUser.msgErro).eq(0).contains("Informe o nome");

  cy.get(regisUser.typeNome).invoke("val").should("be.empty");
  cy.get(regisUser.msgErro).eq(1).contains("Informe o e-mail");

  cy.get(regisUser.typeSenhaValida).invoke("val").should("be.empty");
  cy.get(regisUser.msgErro).eq(2).contains("Informe a senha");

  cy.get(regisUser.typeConfirmarSenhaValida).invoke("val").should("be.empty");
  cy.get(regisUser.msgErro).eq(3).contains("Informe a senha");
});

Then(
  "a operação de registro não poderá ser concluida com alerta {string}",
  function (alerta) {
    cy.get(regisUser.msgErro).contains(alerta);
  }
);

Then("a operação de registro não poderá ser concluída", function () {
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
    cy.get(regisUser.msgFalhaCadastro).contains("Falha no cadastro.");
    cy.get(regisUser.mcsgErroCadastro).contains(
      "E-mail já cadastrado. Utilize outro e-mail"
    );
  }
);

Then("o botao Ok deve retornar para o formulário", function () {
  regisUser.clickOk();
  cy.get(regisUser.campoForms).should("be.visible");
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
  cy.wait("@auth");
  cy.get(regisUser.perfil).contains("Perfil");
});
