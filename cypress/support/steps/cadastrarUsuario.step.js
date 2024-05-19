import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CadastroPage from "../pages/cadastroPage";
import { fakerPT_BR } from "@faker-js/faker";

const regisUser = new CadastroPage();

Given("que acessei a página de cadastro de usuário", function () {
  cy.visit("/register");
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
  regisUser.typeSenha();
});

When("confirmo a senha informada", function () {
  regisUser.typeConfirmarSenha();
});

When("informo um email com formato inválido {string}", function (email) {
  regisUser.typeEmail(email);
});

When("confirmo a operação", function () {
  cy.intercept(
    "POST",
    "https://raromdb-3c39614e42d4.herokuapp.com/api/users"
  ).as("post");
  regisUser.clickCadastrar();
});

Then(
  "o usuário será registrado com mensagem de cadastro com sucesso",
  function () {
    cy.wait("@post");
    cy.get(regisUser.msgSucesso).contains("Cadastro realizado!");
  }
);

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
    cy.get(regisUser.typeSenha).invoke("val").should("be.empty");
    cy.get(regisUser.msgErro).eq(0).contains("Informe a senha");

    cy.get(regisUser.typeConfirmarSenha).invoke("val").should("be.empty");
    cy.get(regisUser.msgErro).eq(1).contains("Informe a senha");
  }
);

Then(
  "o site verifica que o campo Confirmar senha está limpo alertando para informar a senha",
  function () {
    cy.get(regisUser.typeConfirmarSenha).invoke("val").should("be.empty");
    cy.get(regisUser.msgErro).contains("Informe a senha");
  }
);

Then("a operação de registro não poderá ser concluída", function () {
  cy.get(regisUser.msgFalhaCadastro).contains("Falha no cadastro.");
  cy.get(regisUser.mcsgErroCadastro).contains(
    "Não foi possível cadastrar o usuário."
  );
});
